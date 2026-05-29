package com.example.assignment.ui.auth.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.assignment.data.UserDao
import com.example.assignment.data.UserEntity
import com.example.assignment.ui.common.UiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import java.security.MessageDigest

class RegisterViewModel(private val userDao: UserDao) : ViewModel() {

    private val _registerState = MutableStateFlow<UiState<Unit>>(UiState.Loading)
    val registerState: StateFlow<UiState<Unit>> = _registerState

    fun register(username: String, email: String, password: String, confirmPassword: String) {
        if (username.isBlank() || email.isBlank() || password.isBlank()) {
            _registerState.value = UiState.Error("All fields are required")
            return
        }
        if (password != confirmPassword) {
            _registerState.value = UiState.Error("Passwords do not match")
            return
        }
        if (password.length < 6) {
            _registerState.value = UiState.Error("Password must be at least 6 characters")
            return
        }

        viewModelScope.launch {
            try {
                val existing = userDao.getUserByEmail(email.trim())
                if (existing != null) {
                    _registerState.value = UiState.Error("An account with this email already exists")
                    return@launch
                }

                val entity = UserEntity(
                    username = username.trim(),
                    email = email.trim(),
                    passwordHash = password.sha256(),
                    displayName = username.trim()
                )
                userDao.insertUser(entity)
                _registerState.value = UiState.Success(Unit)
            } catch (e: Exception) {
                _registerState.value = UiState.Error(e.message ?: "Registration failed")
            }
        }
    }

    fun resetState() {
        _registerState.value = UiState.Loading
    }

    class Factory(private val userDao: UserDao) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return RegisterViewModel(userDao) as T
        }
    }
}

private fun String.sha256(): String {
    val bytes = MessageDigest.getInstance("SHA-256").digest(toByteArray())
    return bytes.joinToString("") { "%02x".format(it) }
}
