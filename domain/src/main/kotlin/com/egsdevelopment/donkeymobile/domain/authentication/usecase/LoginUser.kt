package com.egsdevelopment.donkeymobile.domain.authentication.usecase

import com.egsdevelopment.donkeymobile.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.UserCredentials
import javax.inject.Inject

class LoginUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke(credentials: UserCredentials): Result<User> {
        return authenticator.login(credentials)
    }
}