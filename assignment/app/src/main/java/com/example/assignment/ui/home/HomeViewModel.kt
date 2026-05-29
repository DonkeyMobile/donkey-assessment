package com.example.assignment.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.example.assignment.data.PostDao
import com.example.assignment.data.PostWithAuthor
import kotlinx.coroutines.flow.Flow

class HomeViewModel(private val postDao: PostDao) : ViewModel() {

    val posts: Flow<PagingData<PostWithAuthor>> = Pager(
        config = PagingConfig(
            pageSize = 20,
            enablePlaceholders = false
        ),
        pagingSourceFactory = { postDao.getAllPostsWithAuthors() }
    ).flow.cachedIn(viewModelScope)

    class Factory(private val postDao: PostDao) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(postDao) as T
        }
    }
}