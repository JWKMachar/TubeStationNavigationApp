package API.db

import org.neo4j.ogm.config.Configuration
import org.neo4j.ogm.session.Session
import org.neo4j.ogm.session.SessionFactory

class DBConnect private constructor() {

    private val config = Configuration.Builder()
        //.uri("bolt://localhost")
        .uri("neo4j+s://99156147.databases.neo4j.io")
        .credentials("neo4j", "rw6Bai2uRKZ43n33MraeTJiawd08-2N42sdPGV_elto")
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