package com.egsdevelopment.template.presentation.features.login.event

sealed class LoginEvent {
    object LoginFail : LoginEvent()
    object LoginSuccess : LoginEvent()
}