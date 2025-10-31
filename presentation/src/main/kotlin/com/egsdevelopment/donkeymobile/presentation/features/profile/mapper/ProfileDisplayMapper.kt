package com.egsdevelopment.donkeymobile.presentation.features.profile.mapper

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.ProfileDisplay
import javax.inject.Inject

class ProfileDisplayMapper @Inject constructor(
    private val userDisplayMapper: UserDisplayMapper
) {

    fun map(user: User): ProfileDisplay {
        return ProfileDisplay(
            user = userDisplayMapper.map(user),
            bio = user.bio
        )
    }
}