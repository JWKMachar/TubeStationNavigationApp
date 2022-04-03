package API.model

import kotlinx.serialization.Serializable

@Serializable
data class ResultConnection(
    val station: String,
    val line: String,
    val lat: Double,
    val lng: Double
)