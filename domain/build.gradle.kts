plugins {
    alias(libs.plugins.kotlin.jvm.plugin)
    alias(libs.plugins.kotlin.kapt.plugin)
    alias(libs.plugins.google.devtools.ksp)
}

kotlin {
    jvmToolchain(18)
}

dependencies {

    // hilt
    ksp(libs.dagger.hilt.android.compiler)
    implementation(libs.dagger)

    // kotlin
    implementation(libs.kotlin.std.lib)

    // coroutines
    implementation(libs.coroutines.core)

    // testing
    testImplementation(libs.junit)
}
repositories {
    mavenCentral()
}
