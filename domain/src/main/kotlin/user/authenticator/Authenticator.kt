package user.authenticator

import user.model.User
import user.model.UserCredentials

interface Authenticator {

    fun login(credentials: UserCredentials): Result<User>
}