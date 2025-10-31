package com.egsdevelopment.donkeymobile.presentation.features.community.mapper

import com.egsdevelopment.domain.community.model.Community
import com.egsdevelopment.donkeymobile.presentation.features.community.display.CommunityDisplay
import com.egsdevelopment.donkeymobile.presentation.features.posts.mapper.PostDisplayMapper
import javax.inject.Inject

class CommunityDisplayMapper @Inject constructor(
    private val postDisplayMapper: PostDisplayMapper
) {

    fun mapList(list: List<Community>): List<CommunityDisplay> {
        return list.map { community ->
            map(community)
        }
    }

    fun map(community: Community): CommunityDisplay {
        return CommunityDisplay(
            posts = postDisplayMapper.mapList(community.posts)
        )
    }
}