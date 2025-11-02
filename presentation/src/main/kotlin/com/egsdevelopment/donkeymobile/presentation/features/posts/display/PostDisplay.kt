package com.egsdevelopment.donkeymobile.presentation.features.posts.display

import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay

data class PostDisplay(
    val title: String,
    val message: String,
    val imageSrc: String?,
    val user: UserDisplay,
    val time: String?
)
