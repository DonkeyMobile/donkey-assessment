package com.egsdevelopment.domain.community.repository

import com.egsdevelopment.domain.community.model.Community

interface CommunityRepository {

    fun getCommunities(): List<Community>

    fun getCommunity(id: Int): Community?
}