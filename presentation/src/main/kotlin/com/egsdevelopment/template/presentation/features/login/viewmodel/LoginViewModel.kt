package com.egsdevelopment.template.presentation.features.login.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.egsdevelopment.template.presentation.features.login.event.LoginEvent
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import user.model.UserCredentials
import user.usecase.LoginUser
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val loginUser: LoginUser
) : ViewModel() {

    private var filledUserName: String = ""
    private var filledPassword: String = ""

    private val mutableLoginButtonEnabled = MutableStateFlow<Boolean>(false)
    val loginButtonEnabled: StateFlow<Boolean> = mutableLoginButtonEnabled.asStateFlow()

    private val mutableEvent = MutableSharedFlow<LoginEvent>()
    val event = mutableEvent.asSharedFlow()

    fun setUserName(input: String) {
        filledUserName = input
        determineEnableLoginButton()
    }

    fun setPassword(input: String) {
        filledPassword = input
        determineEnableLoginButton()
    }

    fun startLogin() {
        viewModelScope.launch {
            val credentials = UserCredentials(filledUserName, filledPassword)
            //
            loginUser(credentials)
                .onSuccess {
                    mutableEvent.emit(LoginEvent.LoginSuccess)
                }
                .onFailure {
                    mutableEvent.emit(LoginEvent.LoginFail)
                }
        }
    }

    private fun determineEnableLoginButton() {
        mutableLoginButtonEnabled.value = filledUserName.isNotEmpty() && filledPassword.isNotEmpty()
    }
}