package com.egsdevelopment.donkeymobile.data.authentication.module

import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import com.egsdevelopment.domain.authentication.authenticator.Authenticator
import com.egsdevelopment.donkeymobile.data.authentication.authenticator.AuthenticatorImpl

@Module
@InstallIn(SingletonComponent::class)
abstract class UserModule {

    @Binds
    abstract fun bindAuthenticator(authenticatorImpl: AuthenticatorImpl): Authenticator
}