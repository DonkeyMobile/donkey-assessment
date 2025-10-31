plugins {
    alias(libs.plugins.android.library.plugin)
    alias(libs.plugins.kotlin.android.plugin)
    alias(libs.plugins.kotlin.kapt.plugin)
    alias(libs.plugins.navigation.safe.args.plugin)
    alias(libs.plugins.dagger.hilt.plugin)
    alias(libs.plugins.google.devtools.ksp)
    alias(libs.plugins.kotlin.serialization.plugin)
}

kotlin {
    jvmToolchain(18)
}

android {
    namespace = "com.egsdevelopment.donkeymobile.presentation"
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

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    // project
    implementation(project(":domain"))

    // kotlin
    implementation(libs.kotlin.std.lib)

    // android framework
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.app.compat)
    implementation(libs.androidx.navigation.ui.ktx)
    implementation(libs.androidx.navigation.fragment.ktx)

    // glide
    implementation(libs.glide)

    // timber
    implementation(libs.timber)

    // testing
    testImplementation(libs.junit)

    // hilt
    implementation(libs.dagger.hilt.android)
    ksp(libs.dagger.hilt.android.compiler)
}
