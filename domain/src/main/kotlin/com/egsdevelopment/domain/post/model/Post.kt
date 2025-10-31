package com.egsdevelopment.domain.post.model

data class Post(
    val id: Int,
    val title: String,
    val message: String,
    val imgSrc: String?,
    val timeStamp: String
)