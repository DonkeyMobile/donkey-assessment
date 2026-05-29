package com.example.assignment.ui.auth.register

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
import com.example.assignment.ui.auth.login.LoginActivity
import com.example.assignment.ui.auth.login.LoginViewModel
import com.example.assignment.ui.common.UiState
import kotlinx.coroutines.launch
import kotlin.getValue

class RegisterActivity: AppCompatActivity() {
    private val viewModel: RegisterViewModel by viewModels {
        RegisterViewModel.Factory((application as App).database.userDao())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val etUsername        = findViewById<EditText>(R.id.etUsername)
        val etEmail           = findViewById<EditText>(R.id.etEmail)
        val etPassword        = findViewById<EditText>(R.id.etPassword)
        val etConfirmPassword = findViewById<EditText>(R.id.etConfirmPassword)
        val btnRegister       = findViewById<Button>(R.id.btnRegister)
        val tvLogin           = findViewById<TextView>(R.id.tvLogin)
        val progressBar       = findViewById<ProgressBar>(R.id.progressBar)

        btnRegister.setOnClickListener {
            progressBar.visibility = View.VISIBLE
            btnRegister.isEnabled = false
            viewModel.register(
                username = etUsername.text.toString(),
                email = etEmail.text.toString(),
                password = etPassword.text.toString(),
                confirmPassword = etConfirmPassword.text.toString()
            )
        }

        tvLogin.setOnClickListener { 
            startActivity(Intent(this, LoginActivity::class.java))
        }

        lifecycleScope.launch {
            viewModel.registerState.collect { state ->
                when (state) {
                    is UiState.Loading -> {
                        progressBar.visibility = View.GONE
                        btnRegister.isEnabled = true
                    }
                    is UiState.Success -> {
                        progressBar.visibility = View.GONE
                        Toast.makeText(this@RegisterActivity, "Account created!", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@RegisterActivity, LoginActivity::class.java))
                        finish()
                    }
                    is UiState.Error -> {
                        progressBar.visibility = View.GONE
                        btnRegister.isEnabled = true
                        Toast.makeText(this@RegisterActivity, state.message, Toast.LENGTH_SHORT).show()
                        viewModel.resetState()
                    }
                }
            }
        }
    }
}