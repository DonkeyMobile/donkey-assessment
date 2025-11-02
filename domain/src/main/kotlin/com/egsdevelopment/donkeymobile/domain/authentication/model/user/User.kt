package com.egsdevelopment.donkeymobile.domain.authentication.model.user

data class User(
    val id: Int,
    val name: String,
    val bio: String,
    val avatarHexColor: String,
    val communitiesIds: List<Int>
)
