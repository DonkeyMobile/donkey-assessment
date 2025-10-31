package com.egsdevelopment.donkeymobile.data.post.entity

data class PostEntity(
    val id: Int,
    val title: String,
    val message: String,
    val imgSrc: String?,
    val timeStamp: String
)
