package com.egsdevelopment.donkeymobile.domain.community.usecase

import com.egsdevelopment.donkeymobile.domain.community.model.Community
import com.egsdevelopment.donkeymobile.domain.community.repository.CommunityRepository
import javax.inject.Inject

class GetCommunity @Inject constructor(
    private val communityRepository: CommunityRepository
) {

    operator fun invoke(id: Int): Community? {
        return communityRepository.getCommunity(id)
    }
}