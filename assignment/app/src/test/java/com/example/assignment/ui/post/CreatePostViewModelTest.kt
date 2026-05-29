package com.example.assignment.ui.post

import com.example.assignment.data.GroupDao
import com.example.assignment.data.PostDao
import com.example.assignment.data.PostEntity
import com.example.assignment.ui.common.UiState
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class CreatePostViewModelTest {

    private lateinit var viewModel: CreatePostViewModel
    private val postDao: PostDao = mockk()
    private val groupDao: GroupDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        viewModel = CreatePostViewModel(postDao, groupDao)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `createPost with empty content and no image returns error`() {
        // When
        viewModel.createPost(userId = 1, content = "", imageUrl = null)

        // Then
        val state = viewModel.postState.value
        assertTrue(state is UiState.Error)
        assertEquals("Post cannot be empty", (state as UiState.Error).message)
    }

    @Test
    fun `createPost with content calls dao and returns success`() {
        // Given
        coEvery { postDao.insertPost(any()) } returns Unit

        // When
        viewModel.createPost(userId = 1, content = "Hello world", imageUrl = null)

        // Then
        coVerify { postDao.insertPost(match { it.userId == 1 && it.content == "Hello world" }) }
        assertTrue(viewModel.postState.value is UiState.Success)
    }

    @Test
    fun `createPost with group id and membership passes group id to dao`() {
        // Given
        coEvery { groupDao.isUserInGroup(1, 10) } returns true
        coEvery { postDao.insertPost(any()) } returns Unit

        // When
        viewModel.createPost(userId = 1, content = "Group post", imageUrl = null, groupId = 10)

        // Then
        coVerify { postDao.insertPost(match { it.groupId == 10 }) }
        assertTrue(viewModel.postState.value is UiState.Success)
    }

    @Test
    fun `createPost with group id and NO membership returns error`() {
        // Given
        coEvery { groupDao.isUserInGroup(1, 10) } returns false

        // When
        viewModel.createPost(userId = 1, content = "Group post", imageUrl = null, groupId = 10)

        // Then
        val state = viewModel.postState.value
        assertTrue(state is UiState.Error)
        assertEquals("You must join the group to post", (state as UiState.Error).message)
        coVerify(exactly = 0) { postDao.insertPost(any()) }
    }
}
