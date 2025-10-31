package com.egsdevelopment.donkeymobile.data.authentication.provider

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.authentication.model.user.UserCredentials
import com.egsdevelopment.donkeymobile.data.community.provider.CommunityProvider
import javax.inject.Inject

class UserProvider @Inject constructor(
    private val communityProvider: CommunityProvider
) {

    val mockedUsers = listOf(
        User(
            id = 0,
            credentials = UserCredentials(
                username = "e_smits",
                password = "Test1234"
            ),
            communitiesIds = listOf(0, 1, 2)
        ),
        User(
            id = 0,
            credentials = UserCredentials(
                username = "jordy_donkeymobile",
                password = "TestJordy1234"
            ),
            communitiesIds = listOf(3, 4, 5)
        ),
        User(
            id = 0,
            credentials = UserCredentials(
                username = "henrik_donkeymobile",
                password = "TestHenrik1234"
            ),
            communitiesIds = listOf(6, 7, 8)
        )
    )

    fun getUserForCredentials(credentials: UserCredentials): User? {
        return mockedUsers.firstOrNull { it.credentials == credentials }
    }
}