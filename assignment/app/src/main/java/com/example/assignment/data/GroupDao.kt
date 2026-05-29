package com.example.assignment.data

import androidx.paging.PagingSource
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface GroupDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertGroup(group: GroupEntity): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun joinGroup(userGroup: UserGroupEntity)

    @Query("SELECT * FROM groups")
    fun getAllGroups(): Flow<List<GroupEntity>>

    @Query("""
        SELECT groups.* FROM groups 
        INNER JOIN user_groups ON groups.id = user_groups.groupId 
        WHERE user_groups.userId = :userId
    """)
    fun getGroupsForUser(userId: Int): Flow<List<GroupEntity>>

    @Query("SELECT * FROM groups WHERE id = :groupId")
    suspend fun getGroupById(groupId: Int): GroupEntity?

    @Query("""
        SELECT posts.*, users.displayName as authorName 
        FROM posts 
        INNER JOIN users ON posts.userId = users.id 
        WHERE posts.groupId = :groupId 
        ORDER BY createdAt DESC
    """)
    fun getGroupPosts(groupId: Int): PagingSource<Int, PostWithAuthor>

    @Query("SELECT COUNT(*) FROM user_groups WHERE userId = :userId AND groupId = :groupId")
    suspend fun isUserInGroup(userId: Int, groupId: Int): Boolean

    @Query("""
        SELECT groups.*, (user_groups.userId IS NOT NULL) as isJoined 
        FROM groups 
        LEFT JOIN user_groups ON groups.id = user_groups.groupId AND user_groups.userId = :userId
    """)
    fun getAllGroupsWithMembership(userId: Int): Flow<List<GroupWithMembership>>
}

data class GroupWithMembership(
    val id: Int,
    val name: String,
    val description: String?,
    val createdAt: Long,
    val isJoined: Boolean
)
