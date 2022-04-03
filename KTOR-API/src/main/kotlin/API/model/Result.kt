package API.model

import kotlinx.serialization.Serializable

@Serializable
data class Result(
    val start: ResultConnection,
    val steps: MutableList<ResultConnection>,
    val end: ResultConnection
)