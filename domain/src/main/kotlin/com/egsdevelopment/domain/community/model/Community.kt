package com.egsdevelopment.domain.community.model

import com.egsdevelopment.domain.post.model.Post

data class Community(
    val id: Int,
    val name: String,
    val posts: List<Post>
)