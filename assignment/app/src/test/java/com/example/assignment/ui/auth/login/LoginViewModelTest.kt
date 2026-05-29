package com.example.assignment.ui.auth.login

import com.example.assignment.data.UserDao
import com.example.assignment.data.UserEntity
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
import java.security.MessageDigest

@OptIn(ExperimentalCoroutinesApi::class)
class LoginViewModelTest {

    private lateinit var viewModel: LoginViewModel
    private val userDao: UserDao = mockk()
    private val testDispatcher = UnconfinedTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        viewModel = LoginViewModel(userDao)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `login with empty fields returns error`() {
        // When
        viewModel.login("", "")

        // Then
        val state = viewModel.loginState.value
        assertTrue(state is UiState.Error)
        assertEquals("Email and password cannot be empty", (state as UiState.Error).message)
    }

    @Test
    fun `login with correct credentials returns success`() {
        // Given
        val email = "test@example.com"
        val password = "password123"
        val hashedPassword = password.sha256()
        val user = UserEntity(id = 1, username = "test", email = email, passwordHash = hashedPassword, displayName = "Test User")
        
        coEvery { userDao.login(email, hashedPassword) } returns user

        // When
        viewModel.login(email, password)

        // Then
        val state = viewModel.loginState.value
        assertTrue(state is UiState.Success)
        assertEquals(user, (state as UiState.Success).data)
    }

    @Test
    fun `login with invalid credentials returns error`() {
        // Given
        val email = "wrong@example.com"
        val password = "wrong"
        val hashedPassword = password.sha256()
        
        coEvery { userDao.login(email, hashedPassword) } returns null

        // When
        viewModel.login(email, password)

        // Then
        val state = viewModel.loginState.value
        assertTrue(state is UiState.Error)
        assertEquals("Invalid email or password", (state as UiState.Error).message)
    }

    private fun String.sha256(): String {
        val bytes = MessageDigest.getInstance("SHA-256").digest(toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}
