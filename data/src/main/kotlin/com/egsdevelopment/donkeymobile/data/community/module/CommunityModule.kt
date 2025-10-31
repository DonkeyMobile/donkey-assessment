package com.egsdevelopment.donkeymobile.data.community.module

import com.egsdevelopment.domain.community.repository.CommunityRepository
import com.egsdevelopment.donkeymobile.data.community.repository.CommunityRepositoryImpl
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class CommunityModule {

    @Binds
    abstract fun bindCommunityRepository(communityRepositoryImpl: CommunityRepositoryImpl): CommunityRepository
}