package user.module

import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import user.authenticator.Authenticator
import user.authenticator.AuthenticatorImpl

@Module
@InstallIn(SingletonComponent::class)
abstract class UserModule {

    @Binds
    abstract fun bindAuthenticator(authenticatorImpl: AuthenticatorImpl): Authenticator
}