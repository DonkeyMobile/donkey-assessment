package com.egsdevelopment.donkeymobile.domain.community.model

import com.egsdevelopment.donkeymobile.domain.post.model.Post

data class Community(
    val id: Int,
    val name: String,
    val posts: List<Post>
)