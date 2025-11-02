package com.egsdevelopment.donkeymobile.domain.community.repository

import com.egsdevelopment.donkeymobile.domain.community.model.Community

interface CommunityRepository {

    fun getCommunities(): List<Community>

    fun getCommunity(id: Int): Community?
}