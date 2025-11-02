package com.egsdevelopment.donkeymobile.presentation.features.community.viewmodel

import androidx.lifecycle.ViewModel
import com.egsdevelopment.donkeymobile.domain.community.usecase.GetCommunity
import com.egsdevelopment.donkeymobile.presentation.features.community.display.CommunityDisplay
import com.egsdevelopment.donkeymobile.presentation.features.community.mapper.CommunityDisplayMapper
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class CommunityViewModel @Inject constructor(
    private val getCommunity: GetCommunity,
    private val communityDisplayMapper: CommunityDisplayMapper
) : ViewModel() {

    private val mutableCommunity = MutableStateFlow<CommunityDisplay?>(null)
    val community: StateFlow<CommunityDisplay?> = mutableCommunity.asStateFlow()

    fun fetchCommunity(id: Int) {
        getCommunity(id)?.let { community ->
            mutableCommunity.value = communityDisplayMapper.map(community)
        } ?: {
            /**
             * Normally we should use a state (failure) like in in the CommunitiesViewModel here.
             * But omitted for assessment speed purposes.
             */
            Timber.d("Commmunity not found")
        }
    }
}