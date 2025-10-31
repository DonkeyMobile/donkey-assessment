package com.egsdevelopment.donkeymobile.data.user.mapper

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.data.user.entity.UserEntitiy
import javax.inject.Inject

class UserMapper @Inject constructor() {

    fun mapList(list: List<UserEntitiy>): List<User> {
        return list.map { userEntitiy ->
            map(userEntitiy)
        }
    }

    fun map(entity: UserEntitiy): User {
        return User(
            id = entity.id,
            name = entity.username,
            bio = entity.bio,
            avatarHexColor = entity.avatarHexColor,
            communitiesIds = entity.communitiesIds
        )
    }
}