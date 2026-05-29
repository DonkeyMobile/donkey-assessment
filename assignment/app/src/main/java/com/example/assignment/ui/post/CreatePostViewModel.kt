package com.example.assignment.ui.post

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.assignment.data.GroupDao
import com.example.assignment.data.PostDao
import com.example.assignment.data.PostEntity
import com.example.assignment.ui.common.UiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class CreatePostViewModel(
    private val postDao: PostDao,
    private val groupDao: GroupDao
) : ViewModel() {

    private val _postState = MutableStateFlow<UiState<Unit>>(UiState.Success(Unit))
    val postState: StateFlow<UiState<Unit>> = _postState

    fun createPost(userId: Int, content: String?, imageUrl: String?, groupId: Int? = null) {
        if (content.isNullOrBlank() && imageUrl.isNullOrBlank()) {
            _postState.value = UiState.Error("Post cannot be empty")
            return
        }

        _postState.value = UiState.Loading
        viewModelScope.launch {
            try {
                if (groupId != null) {
                    val isMember = groupDao.isUserInGroup(userId, groupId)
                    if (!isMember) {
                        _postState.value = UiState.Error("You must join the group to post")
                        return@launch
                    }
                }

                val post = PostEntity(
                    userId = userId,
                    groupId = groupId,
                    content = content,
                    imageUrl = imageUrl
                )
                postDao.insertPost(post)
                _postState.value = UiState.Success(Unit)
            } catch (e: Exception) {
                _postState.value = UiState.Error(e.message ?: "Failed to create post")
            }
        }
    }

    fun resetState() {
        _postState.value = UiState.Success(Unit)
    }

    class Factory(
        private val postDao: PostDao,
        private val groupDao: GroupDao
    ) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return CreatePostViewModel(postDao, groupDao) as T
        }
    }
}
