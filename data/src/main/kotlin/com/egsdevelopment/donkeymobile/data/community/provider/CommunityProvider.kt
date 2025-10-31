package com.egsdevelopment.donkeymobile.data.community.provider

import com.egsdevelopment.donkeymobile.data.community.entity.CommunityEntity
import com.egsdevelopment.donkeymobile.data.post.provider.PostProvider
import javax.inject.Inject

class CommunityProvider @Inject constructor(
    postProvider: PostProvider
) {

    private val COMMUNITY_AMOUNT = 9
    private val CHUNK_SIZE = 50

    private val providedPosts = postProvider.provide()

    fun provideList(): List<CommunityEntity> {
        val communities = mutableListOf<CommunityEntity>()
        repeat(COMMUNITY_AMOUNT) { index ->
            communities.add(provide(index, CHUNK_SIZE))
        }
        return communities
    }

    private fun provide(index: Int, chunkSize: Int): CommunityEntity {
        val fromIndex = index * chunkSize
        val toIndex = minOf(fromIndex + chunkSize, providedPosts.size)
        return CommunityEntity(
            id = index,
            name = communityNames[index],
            posts = providedPosts.subList(fromIndex, toIndex)
        )
    }

    private val communityNames: List<String> = listOf(
        "Gemeente De Lichtbron",
        "Evangelische Kerk De Weg",
        "Protestantse Wijkgemeente Het Kompas",
        "Katholieke Parochie Sint-Jan de Doper",
        "Baptistengemeente Het Fundament",
        "Christengemeente Levend Water",
        "Vrije Evangelische Gemeente De Rank",
        "Gereformeerde Kerk De Oase",
        "Samenkomsthuis De Ark"
    )
}