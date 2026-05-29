package com.example.assignment.model

import com.example.assignment.data.UserEntity;

data class User(
    val id: Int = 0,
    val username: String,
    val email: String,
    val displayName: String,
    val createdAt: Long = System.currentTimeMillis()
)

// Maps from Room entity to model — keeps the password hash out of the UI layer
fun UserEntity.toUser() = User(
    id = id,
    username = username,
    email = email,
    displayName = displayName,
    createdAt = createdAt
)

