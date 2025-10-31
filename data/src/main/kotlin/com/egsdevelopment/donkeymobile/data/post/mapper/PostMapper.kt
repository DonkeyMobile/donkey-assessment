package com.egsdevelopment.donkeymobile.data.post.mapper

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import com.egsdevelopment.domain.post.model.Post
import javax.inject.Inject

class PostMapper @Inject constructor() {

    fun mapList(list: List<PostEntity>): List<Post> {
        return list.map {
            map(it)
        }
    }

    private fun map(entity: PostEntity): Post {
        return Post(
            id = entity.id,
            title = entity.title,
            message = entity.message,
            imgSrc = entity.imgSrc,
            timeStamp = entity.timeStamp
        )
    }
}