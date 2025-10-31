plugins {
    alias(libs.plugins.kotlin.android.plugin)
    alias(libs.plugins.kotlin.kapt.plugin)
    alias(libs.plugins.android.library.plugin)
    alias(libs.plugins.dagger.hilt.plugin)
    alias(libs.plugins.kotlin.serialization.plugin)
    alias(libs.plugins.google.devtools.ksp)
}

kotlin {
    jvmToolchain(18)
}

android {
    namespace = "com.egsdevelopment.donkeymobile.data"
    defaultConfig {
        compileSdk = AppConfig.compileSdkVersion
        minSdk = AppConfig.minSdkVersion
    }
    buildTypes {
        debug {
        }
        release {
            consumerProguardFiles("proguard-rules.pro")
        }
    }
}

dependencies {
    // project
    implementation(project(":domain"))

    // kotlin
    implementation(libs.kotlin.std.lib)

    // testing
    testImplementation(libs.junit)

    // coroutines
    implementation(libs.coroutines.android)
    implementation(libs.coroutines.core)

    // retrofit
    api(libs.retrofit)
    implementation(libs.retrofit.json.converter.extension)

    // okhttp
    implementation(libs.okhttp)

    // dagger hilt
    implementation(libs.dagger.hilt.android)
    ksp(libs.dagger.hilt.android.compiler)

    // Timber logging
    implementation(libs.timber)

    // Androidx annotation
    implementation(libs.androidx.annotation)

    // Room
    implementation(libs.androidx.room.runtime)
    annotationProcessor(libs.androidx.room.compiler)
    ksp(libs.androidx.room.compiler)
    implementation(libs.androidx.room.ktx)

    // DataStore
    implementation(libs.androidx.datastore.preferences)

    // Serialization
    implementation(libs.kotlinx.serialization.json)
}
repositories {
    mavenCentral()
}
