package com.egsdevelopment.donkeymobile.presentation.features.profile.viewmodel

import androidx.lifecycle.ViewModel
import com.egsdevelopment.domain.authentication.usecase.GetCurrentUser
import com.egsdevelopment.domain.authentication.usecase.LogoutUser
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.ProfileDisplay
import com.egsdevelopment.donkeymobile.presentation.features.profile.mapper.ProfileDisplayMapper
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getCurrentUser: GetCurrentUser,
    private val profileDisplayMapper: ProfileDisplayMapper,
    private val logoutUser: LogoutUser
) : ViewModel() {

    private val mutableProfile = MutableStateFlow<ProfileDisplay?>(null)
    val profile: StateFlow<ProfileDisplay?> = mutableProfile.asStateFlow()

    init {
        fetchCurrentProfile()
    }

    private fun fetchCurrentProfile() {
        getCurrentUser()
            .onSuccess { user ->
                mutableProfile.value = profileDisplayMapper.map(user)
            }
            .onFailure {
                Timber.e("failure fetching profile")
            }
    }

    fun performLogOut() {
        logoutUser()
    }
}