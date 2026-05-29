package com.example.assignment.data

import androidx.paging.PagingSource
import androidx.paging.PagingState

// Use this when you need custom loading logic (e.g. filtering, remote+local).
// For simple cases you can use the PagingSource returned directly by UserDao.
class UserPagingSource(
    private val userDao: UserDao,
    private val query: String = ""
) : PagingSource<Int, UserEntity>() {

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, UserEntity> {
        val page = params.key ?: 0
        val pageSize = params.loadSize

        return try {
            val offset = page * pageSize
            val users = if (query.isBlank()) {
                userDao.getUsersWithPagination(limit = pageSize, offset = offset)
            } else {
                userDao.searchUsersPaged(query = query, limit = pageSize, offset = offset)
            }

            LoadResult.Page(
                data = users,
                prevKey = if (page == 0) null else page - 1,
                nextKey = if (users.size < pageSize) null else page + 1
            )
        } catch (e: Exception) {
            LoadResult.Error(e)
        }
    }

    // Called by Paging 3 when it needs to refresh — return the page key
    // closest to the most recently accessed item in the list.
    override fun getRefreshKey(state: PagingState<Int, UserEntity>): Int? {
        return state.anchorPosition?.let { anchor ->
            state.closestPageToPosition(anchor)?.prevKey?.plus(1)
                ?: state.closestPageToPosition(anchor)?.nextKey?.minus(1)
        }
    }
}
