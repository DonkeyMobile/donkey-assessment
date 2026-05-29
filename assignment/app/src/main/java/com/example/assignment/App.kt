package com.example.assignment

import android.app.Application
import com.example.assignment.data.AppDatabase

class App: Application() {

    val database: AppDatabase by lazy {
        AppDatabase.getInstance(this)
    }
    var userId: Int? = null
}