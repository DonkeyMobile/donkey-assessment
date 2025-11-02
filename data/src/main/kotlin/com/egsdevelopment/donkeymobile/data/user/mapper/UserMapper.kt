package com.egsdevelopment.donkeymobile.data.user.mapper

import com.egsdevelopment.donkeymobile.data.user.entity.UserEntity
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import javax.inject.Inject

class UserMapper @Inject constructor() {

    fun mapList(list: List<UserEntity>): List<User> {
        return list.map { userEntity ->
            map(userEntity)
        }
    }

    fun map(entity: UserEntity): User {
        return User(
            id = entity.id,
            name = entity.username,
            bio = entity.bio,
            avatarHexColor = entity.avatarHexColor,
            communitiesIds = entity.communitiesIds
        )
    }
}