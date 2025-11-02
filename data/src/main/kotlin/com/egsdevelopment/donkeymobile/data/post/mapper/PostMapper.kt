package com.egsdevelopment.donkeymobile.data.post.mapper

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import com.egsdevelopment.donkeymobile.data.user.mapper.UserMapper
import com.egsdevelopment.donkeymobile.data.user.provider.UserProvider
import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.domain.post.model.Post
import javax.inject.Inject

class PostMapper @Inject constructor(
    private val userProvider: UserProvider,
    private val userMapper: UserMapper
) {

    private val users = userProvider.provide().map(userMapper::map)

    fun mapList(list: List<PostEntity>): List<Post> {
        return list.mapNotNull {
            map(it)
        }
    }

    private fun map(entity: PostEntity): Post? {
        val poster = mapUserIDToPoster(entity.userId) ?: return null
        return Post(
            id = entity.id,
            title = entity.title,
            message = entity.message,
            imgSrc = entity.imgSrc,
            timeStamp = entity.timeStamp,
            user = poster
        )
    }

    private fun mapUserIDToPoster(userID: Int): User? {
        return users.firstOrNull { user -> user.id == userID }
    }
}