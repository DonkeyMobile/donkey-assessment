package com.egsdevelopment.domain.authentication.usecase

import com.egsdevelopment.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.domain.authentication.model.user.User
import javax.inject.Inject

class GetCurrentUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke(): Result<User> {
        return authenticator.getCurrentUser()
    }
}