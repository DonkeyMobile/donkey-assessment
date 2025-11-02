package com.egsdevelopment.donkeymobile.domain.community.usecase

import com.egsdevelopment.donkeymobile.domain.authentication.model.user.User
import com.egsdevelopment.donkeymobile.domain.community.model.Community
import com.egsdevelopment.donkeymobile.domain.community.repository.CommunityRepository
import javax.inject.Inject

class GetCommunitiesForCurrentUser @Inject constructor(
    private val communityRepository: CommunityRepository
) {

    operator fun invoke(currentUser: User): Result<List<Community>> {
        val fetchedCommunities = communityRepository.getCommunities()
        val userCommunities = fetchedCommunities.filter { community ->
            community.id in currentUser.communitiesIds
        }
        return Result.success(userCommunities)
    }
}