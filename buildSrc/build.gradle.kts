import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    `kotlin-dsl`
}

kotlin {
    jvmToolchain(18)
}

repositories {
    mavenCentral()
    google()
}
dependencies {
    implementation(kotlin("stdlib"))
}