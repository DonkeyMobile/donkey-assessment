package com.egsdevelopment.donkeymobile.domain.authentication.usecase

import com.egsdevelopment.donkeymobile.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import javax.inject.Inject

class GetCurrentUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke(): Result<User> {
        return authenticator.getCurrentUser()
    }
}