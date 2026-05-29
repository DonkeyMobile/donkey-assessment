package com.example.assignment.ui.auth.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.auth.register.RegisterActivity
import com.example.assignment.ui.common.UiState
import com.example.assignment.ui.home.HomeActivity
import com.example.assignment.ui.profile.ProfileActivity
import kotlinx.coroutines.launch

class LoginActivity: AppCompatActivity() {
    private val viewModel: LoginViewModel by viewModels {
        LoginViewModel.Factory((application as App).database.userDao())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail    = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin   = findViewById<Button>(R.id.btnLogin)
        val tvRegister = findViewById<TextView>(R.id.tvRegister)
        val progressBar = findViewById<ProgressBar>(R.id.progressBar)

        btnLogin.setOnClickListener {
            viewModel.login(
                email = etEmail.text.toString(),
                password = etPassword.text.toString()
            )
        }

        tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        lifecycleScope.launch {
            viewModel.loginState.collect { state ->
                when (state) {
                    is UiState.Loading -> {
                        progressBar.visibility = View.GONE
                        btnLogin.isEnabled = true
                    }
                    is UiState.Success -> {
                        println(state.data.id)
                        progressBar.visibility = View.GONE
                        startActivity(Intent(this@LoginActivity, HomeActivity::class.java).apply {
                            putExtra("extra_user_id", state.data.id)
                        })
                        finish()
                    }
                    is UiState.Error -> {
                        progressBar.visibility = View.GONE
                        btnLogin.isEnabled = true
                        Toast.makeText(this@LoginActivity, state.message, Toast.LENGTH_SHORT).show()
                        viewModel.resetState()
                    }
                }
            }
        }
    }
}