package com.example.assignment.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.assignment.data.UserDao
import com.example.assignment.model.User
import com.example.assignment.model.toUser
import com.example.assignment.ui.common.UiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ProfileViewModel(private val userDao: UserDao) : ViewModel() {

    private val _profileState = MutableStateFlow<UiState<User>>(UiState.Loading)
    val profileState: StateFlow<UiState<User>> = _profileState

    private val _updateState = MutableStateFlow<UiState<Unit>?>(null)
    val updateState: StateFlow<UiState<Unit>?> = _updateState

    fun loadUser(userId: Int) {
        viewModelScope.launch {
            try {
                val entity = userDao.getUserById(userId)
                if (entity != null) {
                    _profileState.value = UiState.Success(entity.toUser())
                } else {
                    _profileState.value = UiState.Error("User not found")
                }
            } catch (e: Exception) {
                _profileState.value = UiState.Error(e.message ?: "Failed to load profile")
            }
        }
    }

    fun updateProfile(userId: Int, displayName: String) {
        if (displayName.isBlank()) {
            _updateState.value = UiState.Error("Display name cannot be empty")
            return
        }

        viewModelScope.launch {
            try {
                val existing = userDao.getUserById(userId) ?: return@launch
                val updated = existing.copy(
                    displayName = displayName.trim(),
                )
                userDao.updateUser(updated)
                _profileState.value = UiState.Success(updated.toUser())
                _updateState.value = UiState.Success(Unit)
            } catch (e: Exception) {
                _updateState.value = UiState.Error(e.message ?: "Update failed")
            }
        }
    }

    fun resetUpdateState() {
        _updateState.value = null
    }

    class Factory(private val userDao: UserDao) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return ProfileViewModel(userDao) as T
        }
    }
}