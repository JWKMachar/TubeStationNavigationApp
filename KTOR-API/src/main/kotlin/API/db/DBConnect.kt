package API.db

import org.neo4j.ogm.config.Configuration
import org.neo4j.ogm.session.Session
import org.neo4j.ogm.session.SessionFactory

class DBConnect private constructor() {

    private val config = Configuration.Builder()
        //.uri("bolt://localhost")

        .uri("neo4j+s://99156147.databases.neo4j.io")
        // .uri("neo4j://31.214.246.48:7687")
        .credentials("neo4j", "gopher-teacher-motel-sherman-garage-7272")
        //.credentials("neo4j", "test")
        .build()

    private val session = SessionFactory(config,"API.model")

    private object SINGLETON {
        val INSTANCE = DBConnect()
    }

    companion object {
        private val instance: DBConnect by lazy { SINGLETON.INSTANCE }

        fun getSession(): Session {
            return instance.session.openSession()
        }
    }
}
