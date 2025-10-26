package user.authenticator

import user.error.AuthenticationFailed
import user.model.User
import user.model.UserCredentials
import user.provider.UserProvider
import user.session.SessionManager
import javax.inject.Inject

class AuthenticatorImpl @Inject constructor(
    private val userProvider: UserProvider,
    private val sessionManager: SessionManager,
) : Authenticator {

    override fun login(
        credentials: UserCredentials
    ): Result<User> {
        val matchedUser = userProvider.getUserForCredentials(credentials) ?: return Result.failure(
            exception = AuthenticationFailed()
        )
        sessionManager.setUser(matchedUser)
        return Result.success(matchedUser)
    }
}