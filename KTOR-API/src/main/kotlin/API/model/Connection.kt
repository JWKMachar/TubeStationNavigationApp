package API.model
import kotlinx.serialization.Serializable
import org.neo4j.ogm.annotation.*

@Serializable
@RelationshipEntity(type="Connection")
class Connection{
    @Id @GeneratedValue
    var id: Long = -1
    var Line: String? = null
    var Time: Int = -1

    @StartNode
    var start: STATION? = null
    
    @EndNode
    var end: STATION? = null
}