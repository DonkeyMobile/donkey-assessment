package com.egsdevelopment.donkeymobile.data.authentication.module

import com.egsdevelopment.donkeymobile.data.authentication.authenticator.AuthenticatorImpl
import com.egsdevelopment.donkeymobile.domain.authentication.authenticator.Authenticator
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class UserModule {

    @Binds
    abstract fun bindAuthenticator(authenticatorImpl: AuthenticatorImpl): Authenticator
}