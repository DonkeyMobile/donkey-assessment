package com.example.assignment.ui.group

import com.example.assignment.data.GroupDao
import com.example.assignment.data.GroupEntity
import com.example.assignment.data.UserGroupEntity
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class GroupListViewModelTest {

    private lateinit var viewModel: GroupListViewModel
    private val groupDao: GroupDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()

    private val userId = 1

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        coEvery { groupDao.getAllGroupsWithMembership(userId) } returns flowOf(emptyList())
        viewModel = GroupListViewModel(groupDao, userId)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `joinGroup calls dao with correct parameters`() = runTest {
        // Given
        val userId = 1
        val groupId = 10
        coEvery { groupDao.joinGroup(any()) } returns Unit

        // When
        viewModel.joinGroup(userId, groupId)

        // Then
        coVerify { groupDao.joinGroup(match { it.userId == userId && it.groupId == groupId }) }
    }

    @Test
    fun `createInitialGroups inserts sample groups`() = runTest {
        // Given
        coEvery { groupDao.insertGroup(any()) } returns 1L

        // When
        viewModel.createInitialGroups()

        // Then
        coVerify(atLeast = 1) { groupDao.insertGroup(any()) }
    }
}
