package com.egsdevelopment.donkeymobile.domain.authentication.usecase

import com.egsdevelopment.donkeymobile.domain.authentication.authenticator.Authenticator
import javax.inject.Inject

class LogoutUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke() {
        authenticator.logout()
    }
}