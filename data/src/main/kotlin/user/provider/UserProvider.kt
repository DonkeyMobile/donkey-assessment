package user.provider

import user.model.User
import user.model.UserCredentials
import javax.inject.Inject

class UserProvider @Inject constructor() {

    val mockedUsers = listOf<User>(
        User(
            id = 0,
            credentials = UserCredentials(
                username = "e_smits",
                password = "Test1234"
            )
        ),
        User(
            id = 0,
            credentials = UserCredentials(
                username = "jordy_donkeymobile",
                password = "TestJordy1234"
            )
        ),
        User(
            id = 0,
            credentials = UserCredentials(
                username = "henrik_donkeymobile",
                password = "TestHenrik1234"
            )
        )
    )

    fun getUserForCredentials(credentials: UserCredentials): User? {
        return mockedUsers.firstOrNull { it.credentials == credentials }
    }
}