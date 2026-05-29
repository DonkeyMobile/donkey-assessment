package com.example.assignment.ui.auth.register

import com.example.assignment.data.UserDao
import com.example.assignment.ui.common.UiState
import io.mockk.coEvery
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
class RegisterViewModelTest {

    private lateinit var viewModel: RegisterViewModel
    private val userDao: UserDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        viewModel = RegisterViewModel(userDao)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `register with mismatched passwords returns error`() {
        // When
        viewModel.register("user", "email@test.com", "password", "wrong_password")

        // Then
        val state = viewModel.registerState.value
        assertTrue(state is UiState.Error)
        assertEquals("Passwords do not match", (state as UiState.Error).message)
    }

    @Test
    fun `register with short password returns error`() {
        // When
        viewModel.register("user", "email@test.com", "123", "123")

        // Then
        val state = viewModel.registerState.value
        assertTrue(state is UiState.Error)
        assertEquals("Password must be at least 6 characters", (state as UiState.Error).message)
    }

    @Test
    fun `register with existing email returns error`() {
        // Given
        coEvery { userDao.getUserByEmail("existing@test.com") } returns mockk()

        // When
        viewModel.register("user", "existing@test.com", "password", "password")

        // Then
        val state = viewModel.registerState.value
        assertTrue(state is UiState.Error)
        assertEquals("An account with this email already exists", (state as UiState.Error).message)
    }
}
