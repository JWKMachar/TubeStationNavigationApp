val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project

plugins {
    application
    kotlin("jvm") version "1.6.0"
                id("org.jetbrains.kotlin.plugin.serialization") version "1.6.0"
}

group = "API"
version = "0.0.1"
application {
    mainClass.set("API.ApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core:$ktor_version")
    implementation("io.ktor:ktor-serialization:$ktor_version")
    implementation("io.ktor:ktor-server-netty:$ktor_version")

    implementation("org.neo4j:neo4j-ogm-core:3.2.23")
    //implementation("org.neo4j:neo4j-ogm-http-driver:3.2")
    //implementation("org.neo4j.driver:neo4j-java-driver:4.4.0")
    implementation("org.neo4j:neo4j-ogm-bolt-driver:3.2.23")

    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation("io.ktor:ktor-server-tests:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}