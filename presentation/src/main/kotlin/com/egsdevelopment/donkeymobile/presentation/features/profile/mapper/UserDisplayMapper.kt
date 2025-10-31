package com.egsdevelopment.donkeymobile.presentation.features.profile.mapper

import androidx.core.graphics.toColorInt
import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay
import javax.inject.Inject

class UserDisplayMapper @Inject constructor() {

    fun map(user: User): UserDisplay {
        return UserDisplay(
            username = user.name,
            avatarColor = user.avatarHexColor.toColorInt()
        )
    }
}