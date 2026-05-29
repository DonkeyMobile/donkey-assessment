package com.example.assignment.ui.group

import com.example.assignment.data.GroupDao
import com.example.assignment.data.GroupEntity
import com.example.assignment.data.UserGroupEntity
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class GroupDetailViewModelTest {

    private lateinit var viewModel: GroupDetailViewModel
    private val groupDao: GroupDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()
    private val groupId = 1
    private val userId = 10

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        coEvery { groupDao.getGroupById(groupId) } returns GroupEntity(id = groupId, name = "Test Group", description = "Test Description")
        coEvery { groupDao.isUserInGroup(userId, groupId) } returns false
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `initial state sets group and isJoined correctly`() = runTest {
        // When
        viewModel = GroupDetailViewModel(groupDao, groupId, userId)

        // Then
        assertEquals("Test Group", viewModel.group.value?.name)
        assertFalse(viewModel.isJoined.value)
    }

    @Test
    fun `joinGroup updates isJoined and calls dao`() = runTest {
        // Given
        viewModel = GroupDetailViewModel(groupDao, groupId, userId)
        coEvery { groupDao.joinGroup(any()) } returns Unit
        coEvery { groupDao.isUserInGroup(userId, groupId) } returns true

        // When
        viewModel.joinGroup()

        // Then
        coVerify { groupDao.joinGroup(match { it.userId == userId && it.groupId == groupId }) }
        assertTrue(viewModel.isJoined.value)
    }
}
