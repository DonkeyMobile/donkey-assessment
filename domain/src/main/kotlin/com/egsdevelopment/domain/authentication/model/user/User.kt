package com.egsdevelopment.domain.authentication.model.user

data class User(
    val id: Long,
    val credentials: UserCredentials,
    val communitiesIds: List<Int>
)
