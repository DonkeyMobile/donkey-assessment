package com.egsdevelopment.donkeymobile.data.authentication.authenticator

import com.egsdevelopment.domain.authentication.error.AuthenticationFailed
import com.egsdevelopment.domain.authentication.model.user.UserCredentials
import com.egsdevelopment.donkeymobile.data.authentication.session.SessionManager
import com.egsdevelopment.donkeymobile.data.user.mapper.UserMapper
import com.egsdevelopment.donkeymobile.data.user.provider.UserProvider
import io.mockk.every
import io.mockk.mockk
import junit.framework.TestCase.assertTrue
import org.junit.Test

class AuthenticatorImplTest {

    @Test
    fun `When userCredentials are not known return AuthenticationFailed`() {
        // Given
        val mockUserCredentials = mockk<UserCredentials>()
        every { mockUserCredentials.username } returns "username"
        every { mockUserCredentials.password } returns "password"

        val mockUserProvider = mockk<UserProvider>()
        every { mockUserProvider.getUserForCredentials(mockUserCredentials) } returns null

        val mockUserMapper = mockk<UserMapper>()
        val mockSessionManager = mockk<SessionManager>()

        val authenticatorImpl = AuthenticatorImpl(
            userProvider = mockUserProvider,
            sessionManager = mockSessionManager,
            userMapper = mockUserMapper
        )
        // When
        val result = authenticatorImpl.login(mockUserCredentials)

        // Then
        assertTrue(result.isFailure)
        assertTrue(result.exceptionOrNull() is AuthenticationFailed)
    }
}