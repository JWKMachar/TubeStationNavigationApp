package API.plugins

import API.db.DBConnect
import API.model.Result
import API.model.ResultConnection
import API.model.STATION
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.Serializable
import org.neo4j.ogm.session.query

@Serializable
data class TestResponse(val from: String, val to: String)

fun Application.configureRouting() {

    routing {
        get("/duplicate") {

            // Utility endpoint that should only need to be run once - for database manipulation
            throw Exception("Are you sure you want to do this? Remove this if so")
            val session = DBConnect.getSession()
            val tx = session.beginTransaction()


            try {
                val result = session.loadAll(STATION::class.java, 3)

                result.forEach { station ->
                        station.connections?.forEach {
                            session.query<STATION>("MATCH (A:STATION {name:\"${station.name}\"}) MATCH (B:STATION {name:\"${it.end?.name}\"}) CREATE (B)-[:Connection{Line:'${it.Line}',Time:${it.Time}}]->(A) RETURN A")
                        }
                }
                tx.commit()
            } catch(e: Exception) { tx.rollback() }
            finally { tx.close() }
            call.respond("Ok")
        }

        get("/stations") {
            val query = "match(n:STATION) return n.name"
            val session = DBConnect.getSession()
            val stations = session.query<String>(query).toList().sorted()
            call.respond(stations)
        }

        get("/select") {
            val selected = call.request.queryParameters["selected"]
            val query = "match(n:STATION {name: \"${selected}\"}) return n"
            val session = DBConnect.getSession()
            val station = session.query<STATION>(query)
            call.respond(station)
        }

        get("/search") {
//Store HTTP request Parameters
            val from = call.request.queryParameters["stationOne"]
            val to = call.request.queryParameters["stationTwo"]

            //used when converting long/lat into an estimated time to the finish
            val AVG_TRAIN_SPEED = 0.25 // Kilometers per min

//Connect to DB
            val session = DBConnect.getSession()

//Load Graph
            val query = "MATCH(A :STATION {name: \"${from}\"})\n" +
                    "MATCH(B :STATION {name:\"${to}\"})\n" +
                    "MATCH P = (A)-[*..5]->(B)\n" +
                    "RETURN(P)"
            var result = session.query<STATION>(query).toMutableList()

            if(result.size == 0) {
                result = session.loadAll(STATION::class.java, 3).toMutableList()
            }

//Load Start and End Node
            val startNode = result.find{ it.name == from }
            val endNode = result.find{ it.name == to }

//Initialise Open and Closed Lists
            val openList = mutableListOf<STATION>()
            val closedList = mutableListOf<STATION>()

//Make Start Node Current Node
            var currentNode = startNode
            currentNode?.g = 0;

            //add nodes connected to the current node to the open list
            currentNode?.connections?.forEach{ connection ->
                openList.add(connection.end!!)
            }

//WHILE NOT FINISHED
            while(currentNode != endNode) {

                var lon1 = Math.toRadians(currentNode?.Longitude!!)
                var lon2 = Math.toRadians(endNode!!.Longitude)
                var lat1 = Math.toRadians(currentNode.Latitude)
                var lat2 = Math.toRadians(endNode.Latitude)

                // Haversine formula
                var dlon: Double = lon2 - lon1
                var dlat: Double = lat2 - lat1
                var a = (Math.pow(Math.sin(dlat / 2), 2.0)
                        + (Math.cos(lat1) * Math.cos(lat2)
                        * Math.pow(Math.sin(dlon / 2), 2.0)))

                var c = 2 * Math.asin(Math.sqrt(a))

                // Radius of earth in kilometers. Use 3956
                // for miles

                // Radius of earth in kilometers. Use 3956
                // for miles
                val r = 6371.0

                currentNode.h = (c * r) / AVG_TRAIN_SPEED

//FOREACH Adjacent Node to current - which IS NOT in ClosedList

                currentNode.connections?.forEach { connection ->

                    if(!closedList.contains(connection.end)) {

//Calculate g (g is taken from start node to get to the new node)
                        val newG = currentNode?.g!! + connection.Time

//Calculate h (h is the Heuristic, in this case direct Distance to the endNode)
                        lon1 = Math.toRadians(connection.end?.Longitude!!)
                        lon2 = Math.toRadians(endNode.Longitude)
                        lat1 = Math.toRadians(connection.end?.Latitude!!)
                        lat2 = Math.toRadians(endNode.Latitude)

                        // Haversine formula
                        dlon = lon2 - lon1
                        dlat = lat2 - lat1
                        a = (Math.pow(Math.sin(dlat / 2), 2.0)
                                + (Math.cos(lat1) * Math.cos(lat2)
                                * Math.pow(Math.sin(dlon / 2), 2.0)))

                        c = 2 * Math.asin(Math.sqrt(a))
                        val newH = (c * r) / AVG_TRAIN_SPEED

// Calculate f (sum g and h)
                        var newF = newG + newH
                        //added heuristic if Changing Train Lines
                        if (connection.Line != currentNode?.parentLine) {
                            newF += 2
                        }

                        if( connection?.end?.f!! > newF) {
                            connection?.end?.f = newF
                            connection?.end?.parent = currentNode
                            connection?.end?.parentLine = connection.Line
                        }
                        else if(connection?.end?.f == -1.0){
                            connection?.end?.f = newF
                            connection?.end?.parent = currentNode
                            connection?.end?.parentLine = connection.Line
                        }
                    }

                }
//Move currentNode from openList to closedList and Select New currentNode
                closedList.add(currentNode!!)

                currentNode = openList.first()
                openList.forEach { station ->
                    if (currentNode!!.f > station.f) {
                        currentNode = station
                    }
                }

                openList.remove(currentNode)

                //add nodes connected to the current node to the open list
                currentNode?.connections?.forEach{ connection ->
                    if(!closedList.contains(connection.end!!))
                    {
                        openList.add(connection.end!!)
                    }
                }
            }

            // [ Station, Connection, Station, Connection ]
            if(result != null) {
                var route = mutableListOf<STATION>()
                while(currentNode != startNode) {
                    route.add(currentNode!!)
                    currentNode = currentNode?.parent
                }

                route.add(route.last().parent!!)
                route.reverse()
                val steps = mutableListOf<ResultConnection>()



                route.forEach { station ->
                    steps.add(
                        ResultConnection(
                            station = station.name!!,
                            line = station.parentLine ?: "",
                            lat = station.Latitude,
                            lng = station.Longitude
                        )
                    )
                }

                val response = Result(
                    start = steps[0],
                    end = steps[steps.size - 1],
                    steps = steps
                )

                response.steps.removeAt(0)
                response.steps.removeAt(response.steps.size - 1)


                call.respond(response)

            }
        }
    }
}

