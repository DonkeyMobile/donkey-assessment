package com.egsdevelopment.donkeymobile.presentation.features.home.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.egsdevelopment.domain.authentication.usecase.GetCurrentUser
import com.egsdevelopment.domain.community.usecase.GetCommunitiesForCurrentUser
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val getCommunitiesForCurrentUser: GetCommunitiesForCurrentUser,
    private val getCurrentUser: GetCurrentUser
) : ViewModel() {

    private val mutableState = MutableStateFlow<String>("")
    val _state: StateFlow<String> = mutableState.asStateFlow()

    init {
        viewModelScope.launch {
            mutableState.emit("Evert")
            fetchCommunitiesForUser()
        }
    }

    private fun fetchCommunitiesForUser() {
        val currentUser = getCurrentUser()
            .onSuccess { user ->
                val result = getCommunitiesForCurrentUser(user)
                Timber.d("TEST: result: $result")
            }
            .onFailure { failure ->
                Timber.d("TEST: failure: $failure")
            }
    }
}