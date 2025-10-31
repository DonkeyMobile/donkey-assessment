package com.egsdevelopment.donkeymobile.data.community.entity

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity

data class CommunityEntity(
    val id: Int,
    val name: String,
    val posts: List<PostEntity>
)
