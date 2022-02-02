package API.model

import kotlinx.serialization.Serializable
import org.neo4j.ogm.annotation.GeneratedValue
import org.neo4j.ogm.annotation.Id
import org.neo4j.ogm.annotation.NodeEntity
import org.neo4j.ogm.annotation.Relationship

@Serializable
@NodeEntity
class STATION {
    @Id @GeneratedValue
    //database values
    var id: Long = -1
    var Latitude: Double = -1.0
    var Longitude: Double = -1.0
    var Zone: Int = -1
    var lines: List<String>? = null
    var name: String? = null

    //A* values
    var f: Double = -1.0
    var g: Int  = -1
    var h: Double = -1.0
    var parent:STATION? = null
    var parentLine: String? = null

    @Relationship(type = "Connection")
    var connections: MutableList<Connection>? = null
}