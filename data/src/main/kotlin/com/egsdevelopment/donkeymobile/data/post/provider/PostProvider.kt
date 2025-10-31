package com.egsdevelopment.donkeymobile.data.post.provider

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import com.egsdevelopment.donkeymobile.data.post.generator.PostGenerator
import javax.inject.Inject

class PostProvider @Inject constructor(
    private val generator: PostGenerator
) {

    fun provide(): List<PostEntity> {
        return generator.posts
    }
}