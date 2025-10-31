package com.egsdevelopment.domain.authentication.usecase

import com.egsdevelopment.domain.authentication.authenticator.Authenticator
import javax.inject.Inject

class LogoutUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke() {
        authenticator.logout()
    }
}