package com.example.assignment.ui.auth.login

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


class LoginViewModel(private val userDao: UserDao) : ViewModel() {
    private val _loginState = MutableStateFlow<UiState<UserEntity>>(UiState.Loading)
    val loginState: StateFlow<UiState<UserEntity>> = _loginState

    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            _loginState.value = UiState.Error("Email and password cannot be empty")
            return
        }

        viewModelScope.launch {
            try {
                val hash = password.sha256()
                val entity = userDao.login(email.trim(), hash)
                if (entity != null) {
                    _loginState.value = UiState.Success(entity)
                } else {
                    _loginState.value = UiState.Error("Invalid email or password")
                }
            } catch (e: Exception) {
                _loginState.value = UiState.Error(e.message ?: "Something went wrong")
            }
        }
    }

    fun resetState() {
        _loginState.value = UiState.Loading
    }

    class Factory(private val userDao: UserDao) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return LoginViewModel(userDao) as T
        }
    }
}

private fun String.sha256(): String {
    val bytes = MessageDigest.getInstance("SHA-256").digest(toByteArray())
    return bytes.joinToString("") { "%02x".format(it) }
}
