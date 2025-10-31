package com.egsdevelopment.donkeymobile.data.authentication.session

import com.egsdevelopment.domain.authentication.model.user.User
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Normally we would store a token in a secure location. But for this assessment this is fine
 */
@Singleton
class SessionManager @Inject constructor() {

    private var loggedInUser: User? = null

    fun setUser(user: User) {
        loggedInUser = user
    }

    fun getLoggedInUser(): User? = loggedInUser

    fun logout() {
        loggedInUser = null
    }
}