package com.egsdevelopment.domain.authentication.authenticator

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.authentication.model.user.UserCredentials

interface Authenticator {

    fun login(credentials: UserCredentials): Result<User>

    fun logout()

    fun getCurrentUser(): Result<User>
}