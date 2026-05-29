package com.example.assignment.ui.profile

import com.example.assignment.data.UserDao
import com.example.assignment.data.UserEntity
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
class ProfileViewModelTest {

    private lateinit var viewModel: ProfileViewModel
    private val userDao: UserDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        viewModel = ProfileViewModel(userDao)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `loadUser with valid id updates profileState to Success`() {
        // Given
        val userId = 1
        val userEntity = UserEntity(id = userId, username = "test", email = "test@test.com", passwordHash = "hash", displayName = "Test Name")
        coEvery { userDao.getUserById(userId) } returns userEntity

        // When
        viewModel.loadUser(userId)

        // Then
        val state = viewModel.profileState.value
        assertTrue(state is UiState.Success)
        assertEquals("Test Name", (state as UiState.Success).data.displayName)
    }

    @Test
    fun `loadUser with invalid id updates profileState to Error`() {
        // Given
        val userId = 99
        coEvery { userDao.getUserById(userId) } returns null

        // When
        viewModel.loadUser(userId)

        // Then
        val state = viewModel.profileState.value
        assertTrue(state is UiState.Error)
        assertEquals("User not found", (state as UiState.Error).message)
    }

    @Test
    fun `updateProfile with empty name returns error`() {
        // When
        viewModel.updateProfile(1, "")

        // Then
        val state = viewModel.updateState.value
        assertTrue(state is UiState.Error)
        assertEquals("Display name cannot be empty", (state as UiState.Error).message)
    }

    @Test
    fun `updateProfile with valid name calls dao and updates success`() {
        // Given
        val userId = 1
        val existing = UserEntity(id = userId, username = "test", email = "test@test.com", passwordHash = "hash", displayName = "Old Name")
        coEvery { userDao.getUserById(userId) } returns existing
        coEvery { userDao.updateUser(any()) } returns Unit

        // When
        viewModel.updateProfile(userId, "New Name")

        // Then
        coVerify { userDao.updateUser(match { it.displayName == "New Name" }) }
        assertTrue(viewModel.updateState.value is UiState.Success)
        assertTrue(viewModel.profileState.value is UiState.Success)
        assertEquals("New Name", (viewModel.profileState.value as UiState.Success).data.displayName)
    }
}
