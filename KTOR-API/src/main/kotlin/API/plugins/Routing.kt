package API.plugins

import API.db.DBConnect
import API.model.STATION
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.Serializable
import org.neo4j.ogm.session.query
import kotlin.math.sqrt

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


        get("/search") {
            //val from = call.request.queryParameters["stationOne"]
            //val to = call.request.queryParameters["stationTwo"]
//            if(from == null || to == null) {
//                call.respond(HttpStatusCode.BadRequest)
//                return@get
//            }

            val session = DBConnect.getSession()
            //val result = session.query<STATION>("Match(A:STATION {name:\"Paddington\"}) Return (A)")
            //val result1 = session.query<STATION>("Match(A:STATION {name:\"$from\"}) Return(A)")
            //val result2 = session.query<STATION>("Match(A:STATION {name:\"$to\"}) Return(A)")
            //val result = session.loadAll(STATION::class.java, 0)

//Load Graph
            val result = session.loadAll(STATION::class.java, 3)

//Load Start and End Node
            //val startNode = result.find{ it.name == from } ?: return@get call.respond(400)
            val startNode = result.find{ it.name == "Paddington" }
            val endNode = result.find{ it.name == "Liverpool Street" }

//Initialise Open and Closed Lists
            val openList   = mutableListOf<STATION>()//***************************************************************************************************************** // fill list with current stations
            val closedList = mutableListOf<STATION>()

//Make Start Node Current Node
            var currentNode = startNode
            currentNode?.g = 0;

//WHILE NOT FINISHED
            while(currentNode != endNode) {
                //Calculate f for Start to End
                currentNode?.f = sqrt(
                        ((endNode?.Longitude?.minus(currentNode?.Longitude!!))?.times((endNode?.Longitude?.minus(currentNode?.Longitude!!)!!)))?.plus(
                            ((endNode?.Latitude?.minus(currentNode?.Latitude!!))?.times((endNode?.Latitude?.minus(currentNode?.Latitude!!)))!!)
                        )!!
                )
                currentNode?.h = sqrt(
                        ((endNode?.Longitude?.minus(currentNode?.Longitude!!))?.times((endNode?.Longitude?.minus(currentNode?.Longitude!!)!!)))?.plus(
                            ((endNode?.Latitude?.minus(currentNode?.Latitude!!))?.times((endNode?.Latitude?.minus(currentNode?.Latitude!!)))!!)
                        )!!
                        )

//FOREACH Adjacent Node to current - which IS NOT in ClosedList

                currentNode?.connections?.forEach { connection ->

//Calculate g (g is taken from start node to get to the new node)
                        val newG = currentNode?.g!! + connection.Time

//Calculate h (h is the Heuristic, in this case direct Distance to the endNode)
                        val newH = sqrt(
                            ((endNode?.Longitude?.minus(connection?.end?.Longitude!!))?.times((endNode?.Longitude?.minus(connection?.end?.Longitude!!)!!)))?.plus(
                                ((endNode?.Latitude?.minus(connection?.end?.Latitude!!))?.times((endNode?.Latitude?.minus(connection?.end?.Latitude!!)))!!)
                            )!!)

// Calculate f (sum g and h)

                    val newF = newG + newH
                    //added heuristic if Changing Train Lines
                    //if (connection.Line == currentNode?.parentLine) {
                    //    val newF = newG + newH
                    //}else{
                    //    val newF = newG + newH + 5
                    //}

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



//Move currentNode from openList to closedList and Select New currentNode
                    closedList.add(currentNode!!)
                    openList.drop(openList.indexOf(currentNode))
                    currentNode = openList.first()
                    openList.forEach { station ->
                        if (currentNode!!.f > station.f){
                            currentNode = station
                        }

                    }

                }

            }



            // [ Station, Connection, Station, Connection ]
            // mutableListOf<String>()
            // list.add(JSONSerlialize(Station))
            // list.add(JSONSerlialize(Connection))
            if(result != null) {
                call.respond(result)
            }
//            val res = TestResponse(from = from, to = to)
//            call.respond(res)
        }
    }
}
