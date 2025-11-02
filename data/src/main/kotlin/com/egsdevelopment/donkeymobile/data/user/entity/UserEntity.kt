package com.egsdevelopment.donkeymobile.data.user.entity

data class UserEntity(
    val id: Int,
    val bio: String,
    val username: String,
    val password: String,
    val avatarHexColor: String,
    val communitiesIds: List<Int>
)
