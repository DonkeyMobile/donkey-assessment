package com.example.assignment.data

import androidx.paging.PagingSource
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface PostDao {
    @Insert
    suspend fun insertPost(post: PostEntity)

    @Query("""
        SELECT posts.*, users.displayName as authorName, groups.name as groupName 
        FROM posts 
        INNER JOIN users ON posts.userId = users.id 
        LEFT JOIN groups ON posts.groupId = groups.id
        ORDER BY createdAt DESC
    """)
    fun getAllPostsWithAuthors(): PagingSource<Int, PostWithAuthor>

    @Query("SELECT * FROM posts WHERE userId = :userId ORDER BY createdAt DESC")
    fun getPostsByUser(userId: Int): Flow<List<PostEntity>>
}

data class PostWithAuthor(
    val id: Int,
    val userId: Int,
    val content: String?,
    val imageUrl: String?,
    val createdAt: Long,
    val authorName: String,
    val groupName: String? = null
)
