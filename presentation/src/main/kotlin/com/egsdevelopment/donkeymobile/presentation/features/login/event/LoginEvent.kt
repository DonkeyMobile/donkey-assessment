package com.egsdevelopment.donkeymobile.presentation.features.login.event

sealed class LoginEvent {
    object LoginFail : LoginEvent()
    object LoginSuccess : LoginEvent()
}