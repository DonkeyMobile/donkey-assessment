package com.egsdevelopment.domain.post.model

import com.egsdevelopment.domain.authentication.model.user.User

data class Post(
    val id: Int,
    val title: String,
    val message: String,
    val imgSrc: String?,
    val timeStamp: String,
    val user: User
)