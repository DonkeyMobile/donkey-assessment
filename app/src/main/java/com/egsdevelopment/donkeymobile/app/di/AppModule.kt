package com.egsdevelopment.donkeymobile.app.di

import android.app.Application
import android.content.ClipboardManager
import android.content.Context
import android.content.res.Resources
import androidx.core.content.ContextCompat.getSystemService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
class AppModule {

    @Provides
    fun provideContext(application: Application): Context = application

    @Provides
    fun provideResources(application: Application): Resources = application.resources

    @Provides
    fun provideClipBoardManager(application: Application): ClipboardManager = getSystemService(application, ClipboardManager::class.java) as ClipboardManager
}