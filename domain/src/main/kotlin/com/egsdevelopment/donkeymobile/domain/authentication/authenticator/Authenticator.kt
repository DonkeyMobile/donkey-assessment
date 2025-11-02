package com.egsdevelopment.donkeymobile.domain.authentication.authenticator

import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.UserCredentials

interface Authenticator {

    fun login(credentials: UserCredentials): Result<User>

    fun logout()

    fun getCurrentUser(): Result<User>
}