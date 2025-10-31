package com.egsdevelopment.donkeymobile.data.community.repository

import com.egsdevelopment.donkeymobile.data.authentication.session.SessionManager
import com.egsdevelopment.donkeymobile.data.community.mapper.CommunityMapper
import com.egsdevelopment.domain.community.model.Community
import com.egsdevelopment.donkeymobile.data.community.provider.CommunityProvider
import com.egsdevelopment.domain.community.repository.CommunityRepository
import javax.inject.Inject

class CommunityRepositoryImpl @Inject constructor(
    private val communityProvider: CommunityProvider,
    private val communityMapper: CommunityMapper,
) : CommunityRepository {

    override fun getCommunities(): List<Community> {
        //normally this would be a call to an api but for now we provide the data with providers
        val response = communityProvider.provideList()
        val mapped = communityMapper.mapList(response)
        return mapped
    }
}