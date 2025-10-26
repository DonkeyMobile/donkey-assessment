package user.usecase

import user.authenticator.Authenticator
import user.model.User
import user.model.UserCredentials
import javax.inject.Inject

class LoginUser @Inject constructor(
    private val authenticator: Authenticator
) {

    operator fun invoke(credentials: UserCredentials): Result<User> {
        return authenticator.login(credentials)
    }
}