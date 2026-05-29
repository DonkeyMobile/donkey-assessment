package com.example.assignment.ui.base

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import com.example.assignment.App
import com.example.assignment.R
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.example.assignment.ui.home.HomeActivity
import com.example.assignment.ui.profile.ProfileActivity
import com.example.assignment.ui.group.GroupListActivity

abstract class BaseNavigationActivity: AppCompatActivity() {
    protected fun setupBottomNavigation(navBar: BottomNavigationView) {
        navBar.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_home -> {
                    startActivity(Intent(this@BaseNavigationActivity, HomeActivity::class.java).apply {
                        putExtra("extra_user_id", (application as App).userId)
                    })
                    true
                }
                R.id.navigation_dashboard -> {
                    startActivity(Intent(this@BaseNavigationActivity, GroupListActivity::class.java).apply {
                        putExtra("extra_user_id", (application as App).userId)
                    })
                    true
                }
                R.id.navigation_profile  -> {
                    startActivity(Intent(this@BaseNavigationActivity, ProfileActivity::class.java).apply {
                        putExtra("extra_user_id", (application as App).userId)
                    })
                    true
                }
                else -> false
            }
        }
    }
}