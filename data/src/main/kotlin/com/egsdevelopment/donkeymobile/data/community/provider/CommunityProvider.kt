package com.egsdevelopment.donkeymobile.data.community.provider

import com.egsdevelopment.donkeymobile.data.community.entity.CommunityEntity
import com.egsdevelopment.donkeymobile.data.post.provider.PostProvider
import javax.inject.Inject

class CommunityProvider @Inject constructor(
    postProvider: PostProvider
) {

    private val communityAmount = 9 //9 communities in total, will spread them across 3 users
    private val chunkSize = 50 //50 posts per community

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

    private val providedPosts = postProvider.provide()

    val communities = provideList()

    private fun provideList(): List<CommunityEntity> {
        val communities = mutableListOf<CommunityEntity>()
        repeat(communityAmount) { index ->
            communities.add(provide(index, chunkSize))
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
}