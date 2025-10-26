plugins {
    alias(libs.plugins.android.application.plugin)
    alias(libs.plugins.kotlin.android.plugin)
    alias(libs.plugins.kotlin.kapt.plugin)
    alias(libs.plugins.dagger.hilt.plugin)
    alias(libs.plugins.google.devtools.ksp)
}

kotlin {
    jvmToolchain(18)
}

// define android specific build options here

android {
    signingConfigs {
        create("release") {
            storePassword = "SnowBall888!"
            keyAlias = "template-release"
            keyPassword = "SnowBall888!"
            storeFile =
                file("/Users/evertsmits/Documents/egsdevelopment/Android/keystores/template-release")
        }
    }
    namespace = "com.egsdevelopment.template.app"

    defaultConfig {
        applicationId = "com.egsdevelopment.template"
        minSdk = AppConfig.minSdkVersion
        compileSdk = AppConfig.compileSdkVersion
        targetSdk = AppConfig.targetSdkVersion
        versionCode = AppConfig.appVersionCode
        versionName = AppConfig.appVersionName
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
            isMinifyEnabled = false
            isDebuggable = true
        }
        release {
            isDebuggable = false
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }

    buildFeatures {
        viewBinding = true
    }

    packaging {
        resources.excludes.add("META-INF/AL2.0")
        resources.excludes.add("META-INF/LGPL2.1")
    }
}

dependencies {
    // project
    implementation(project(":presentation"))
    implementation(project(":domain"))
    implementation(project(":data"))

    // kotlin
    implementation(libs.kotlin.std.lib)

    // android framework
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.app.compat)

    // testing
    testImplementation(libs.junit)

    // timber logging
    implementation(libs.timber)

    // dependency injection (hilt)
    implementation(libs.dagger.hilt.android)
    ksp(libs.dagger.hilt.android.compiler)
}
