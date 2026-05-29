package com.example.assignment.ui.profile

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.base.BaseNavigationActivity
import com.example.assignment.ui.common.UiState
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.textfield.TextInputEditText
import kotlinx.coroutines.launch

class ProfileActivity : BaseNavigationActivity() {

    private val viewModel: ProfileViewModel by viewModels {
        ProfileViewModel.Factory((application as App).database.userDao())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val tvUsername    = findViewById<TextView>(R.id.tvUsername)
        val tvEmail       = findViewById<TextView>(R.id.tvEmail)
        val etDisplayName = findViewById<TextInputEditText>(R.id.etDisplayName)
        val btnSave       = findViewById<Button>(R.id.btnSave)
        val progressBar   = findViewById<ProgressBar>(R.id.progressBar)

        val userId = intent.getIntExtra("extra_user_id", -1)

        if (userId == -1) {
            finish()
            return
        }

        (application as App).userId = userId;

        viewModel.loadUser(userId)

        val navBar = findViewById<BottomNavigationView>(R.id.bottom_navigation)
        navBar.selectedItemId = R.id.navigation_profile
        setupBottomNavigation(navBar)

        btnSave.setOnClickListener {
            viewModel.updateProfile(
                userId = userId,
                displayName = etDisplayName.text.toString()
            )
        }

        lifecycleScope.launch {
            viewModel.profileState.collect { state ->
                when (state) {
                    is UiState.Loading -> progressBar.visibility = View.VISIBLE
                    is UiState.Success -> {
                        progressBar.visibility = View.GONE
                        val user = state.data
                        tvUsername.text = user.username
                        tvEmail.text = user.email
                        etDisplayName.setText(user.displayName)
                    }
                    is UiState.Error -> {
                        progressBar.visibility = View.GONE
                        Toast.makeText(this@ProfileActivity, state.message, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

        lifecycleScope.launch {
            viewModel.updateState.collect { state ->
                when (state) {
                    is UiState.Success -> {
                        Toast.makeText(this@ProfileActivity, "Profile updated", Toast.LENGTH_SHORT).show()
                        viewModel.resetUpdateState()
                    }
                    is UiState.Error -> {
                        Toast.makeText(this@ProfileActivity, state.message, Toast.LENGTH_SHORT).show()
                        viewModel.resetUpdateState()
                    }
                    else -> Unit
                }
            }
        }
    }
}
