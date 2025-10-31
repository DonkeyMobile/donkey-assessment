package com.egsdevelopment.domain.authentication.usecase

import com.egsdevelopment.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.authentication.model.user.UserCredentials
import javax.inject.Inject

class LoginUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke(credentials: UserCredentials): Result<User> {
        return authenticator.login(credentials)
    }
}