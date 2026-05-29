package com.example.assignment.ui.group

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.assignment.data.GroupDao
import com.example.assignment.data.GroupEntity
import com.example.assignment.data.UserGroupEntity
import com.example.assignment.data.GroupWithMembership
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class GroupListViewModel(private val groupDao: GroupDao, private val userId: Int) : ViewModel() {

    val allGroups: Flow<List<GroupWithMembership>> = groupDao.getAllGroupsWithMembership(userId)

    fun joinGroup(userId: Int, groupId: Int) {
        viewModelScope.launch {
            groupDao.joinGroup(UserGroupEntity(userId, groupId))
        }
    }

    fun createInitialGroups() {
        viewModelScope.launch {
             // Just some sample groups if none exist
             groupDao.insertGroup(GroupEntity(name = "Android Developers", description = "A group for Android fans"))
             groupDao.insertGroup(GroupEntity(name = "Kotlin Lovers", description = "Discuss everything Kotlin"))
             groupDao.insertGroup(GroupEntity(name = "Mobile UI/UX", description = "Design talk"))
        }
    }

    class Factory(private val groupDao: GroupDao, private val userId: Int) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return GroupListViewModel(groupDao, userId) as T
        }
    }
}
