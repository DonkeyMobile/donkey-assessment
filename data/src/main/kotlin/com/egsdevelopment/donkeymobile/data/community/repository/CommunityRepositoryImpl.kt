package com.egsdevelopment.donkeymobile.data.community.repository

import com.egsdevelopment.donkeymobile.data.community.mapper.CommunityMapper
import com.egsdevelopment.donkeymobile.data.community.provider.CommunityProvider
import com.egsdevelopment.donkeymobile.domain.community.model.Community
import com.egsdevelopment.donkeymobile.domain.community.repository.CommunityRepository
import javax.inject.Inject

class CommunityRepositoryImpl @Inject constructor(
    private val communityProvider: CommunityProvider,
    private val communityMapper: CommunityMapper,
) : CommunityRepository {

    override fun getCommunities(): List<Community> {
        //normally this would be a call to an api but for now we provide the data with providers
        val response = communityProvider.communities
        return communityMapper.mapList(response)
    }

    override fun getCommunity(id: Int): Community? {
        val response = communityProvider.communities.firstOrNull { it.id == id } ?: return null
        return communityMapper.mapItem(response)
    }
}