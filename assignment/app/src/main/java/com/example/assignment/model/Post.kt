package com.example.assignment.model

data class Post(
    val id: Int,
    val userId: Int,
    val authorName: String,
    val content: String?,
    val imageUrl: String?,
    val createdAt: Long
)
