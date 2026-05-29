package com.example.assignment.ui.group

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.example.assignment.data.GroupDao
import com.example.assignment.data.GroupEntity
import com.example.assignment.data.PostWithAuthor
import com.example.assignment.data.UserGroupEntity
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class GroupDetailViewModel(
    private val groupDao: GroupDao,
    private val groupId: Int,
    private val userId: Int
) : ViewModel() {

    private val _group = MutableStateFlow<GroupEntity?>(null)
    val group: StateFlow<GroupEntity?> = _group

    private val _isJoined = MutableStateFlow(false)
    val isJoined: StateFlow<Boolean> = _isJoined

    val posts: Flow<PagingData<PostWithAuthor>> = Pager(
        config = PagingConfig(pageSize = 20),
        pagingSourceFactory = { groupDao.getGroupPosts(groupId) }
    ).flow.cachedIn(viewModelScope)

    init {
        viewModelScope.launch {
            _group.value = groupDao.getGroupById(groupId)
            checkMembership()
        }
    }

    private suspend fun checkMembership() {
        _isJoined.value = groupDao.isUserInGroup(userId, groupId)
    }

    fun joinGroup() {
        viewModelScope.launch {
            groupDao.joinGroup(UserGroupEntity(userId, groupId))
            checkMembership()
        }
    }

    class Factory(
        private val groupDao: GroupDao,
        private val groupId: Int,
        private val userId: Int
    ) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return GroupDetailViewModel(groupDao, groupId, userId) as T
        }
    }
}
