package com.egsdevelopment.donkeymobile.presentation.features.posts.mapper

import com.egsdevelopment.donkeymobile.domain.post.model.Post
import com.egsdevelopment.donkeymobile.presentation.features.posts.display.PostDisplay
import com.egsdevelopment.donkeymobile.presentation.features.posts.formatter.TimeFormatter
import com.egsdevelopment.donkeymobile.presentation.features.profile.mapper.UserDisplayMapper
import javax.inject.Inject

class PostDisplayMapper @Inject constructor(
    private val timeFormatter: TimeFormatter,
    private val userDisplayMapper: UserDisplayMapper
) {

    fun mapList(list: List<Post>): List<PostDisplay> {
        return list.map {
            map(it)
        }
    }

    private fun map(post: Post): PostDisplay {
        return PostDisplay(
            title = post.title,
            message = post.message,
            imageSrc = post.imgSrc,
            user = userDisplayMapper.map(post.user),
            time = timeFormatter.format(post.timeStamp)
        )
    }
}