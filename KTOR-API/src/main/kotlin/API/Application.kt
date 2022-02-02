package API


import API.plugins.configureMonitoring
import API.plugins.configureRouting
import API.plugins.configureSerialization
import io.ktor.server.engine.*
import io.ktor.server.netty.*


fun main() {
    embeddedServer(Netty, port = 8081, host = "0.0.0.0") {
        configureRouting()
        configureMonitoring()
        configureSerialization()


    }.start(wait = true)
}
