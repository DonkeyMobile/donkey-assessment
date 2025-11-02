package com.egsdevelopment.donkeymobile.data.community.mapper

import com.egsdevelopment.donkeymobile.data.community.entity.CommunityEntity
import com.egsdevelopment.donkeymobile.data.post.mapper.PostMapper
import com.egsdevelopment.donkeymobile.domain.community.model.Community
import javax.inject.Inject

class CommunityMapper @Inject constructor(
    private val postMapper: PostMapper
) {

    fun mapList(list: List<CommunityEntity>): List<Community> {
        return list.map { entity ->
            mapItem(entity)
        }
    }

    fun mapItem(entity: CommunityEntity): Community {
        return Community(
            id = entity.id,
            name = entity.name,
            posts = postMapper.mapList(entity.posts)
        )
    }
}