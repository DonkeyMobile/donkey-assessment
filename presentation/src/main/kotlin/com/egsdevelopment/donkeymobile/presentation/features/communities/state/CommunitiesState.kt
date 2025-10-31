package com.egsdevelopment.donkeymobile.presentation.features.communities.state

import com.egsdevelopment.donkeymobile.presentation.features.community.display.CommunityDisplay
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay

sealed class CommunitiesState {

    data class Data(
        val user: UserDisplay,
        val communityIDs: List<Int>
    ) : CommunitiesState()

    object Loading : CommunitiesState()

    data class Failure(
        val message: String
    ) : CommunitiesState()
}

sealed class Event {
    object OnLogOut : Event()
}