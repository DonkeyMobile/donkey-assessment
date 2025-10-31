package com.egsdevelopment.donkeymobile.data.authentication.authenticator

import com.egsdevelopment.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.domain.authentication.error.AuthenticationFailed
import com.egsdevelopment.domain.authentication.error.Unauthenticated
import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.authentication.model.user.UserCredentials
import com.egsdevelopment.donkeymobile.data.user.provider.UserProvider
import com.egsdevelopment.donkeymobile.data.authentication.session.SessionManager
import com.egsdevelopment.donkeymobile.data.user.mapper.UserMapper
import javax.inject.Inject

class AuthenticatorImpl @Inject constructor(
    private val userProvider: UserProvider,
    private val sessionManager: SessionManager,
    private val userMapper: UserMapper
) : Authenticator {

    override fun login(
        credentials: UserCredentials
    ): Result<User> = userProvider.getUserForCredentials(credentials)?.let { user ->
        val mappedUser = userMapper.map(user)
        sessionManager.setUser(mappedUser)
        Result.success(mappedUser)
    } ?: Result.failure(
        exception = AuthenticationFailed()
    )

    override fun logout() {
        sessionManager.logout()
    }

    override fun getCurrentUser(): Result<User> =
        sessionManager.getLoggedInUser()?.let { Result.success(it) }
            ?: Result.failure(Unauthenticated())
}