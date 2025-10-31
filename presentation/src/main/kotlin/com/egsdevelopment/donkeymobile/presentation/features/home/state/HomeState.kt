package com.egsdevelopment.donkeymobile.presentation.features.home.state

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.community.model.Community

sealed class HomeState {

    data class Data(
        val user: User,
        val communities: List<Community>
    ): HomeState()

    object Loading: HomeState()

    data class Failure(
        val message: String
    ): HomeState()

    sealed class Event {
        object OnLogOut: HomeState()
    }
}