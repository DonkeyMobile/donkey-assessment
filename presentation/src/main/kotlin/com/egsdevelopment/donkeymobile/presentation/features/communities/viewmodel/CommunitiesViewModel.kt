package com.egsdevelopment.donkeymobile.presentation.features.communities.viewmodel

import androidx.lifecycle.ViewModel
import com.egsdevelopment.domain.authentication.usecase.GetCurrentUser
import com.egsdevelopment.domain.community.usecase.GetCommunitiesForCurrentUser
import com.egsdevelopment.donkeymobile.presentation.features.communities.state.CommunitiesState
import com.egsdevelopment.donkeymobile.presentation.features.community.mapper.CommunityDisplayMapper
import com.egsdevelopment.donkeymobile.presentation.features.profile.mapper.UserDisplayMapper
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class CommunitiesViewModel @Inject constructor(
    private val getCommunitiesForCurrentUser: GetCommunitiesForCurrentUser,
    private val userDisplayMapper: UserDisplayMapper,
    private val getCurrentUser: GetCurrentUser
) : ViewModel() {

    private val mutableState = MutableStateFlow<CommunitiesState>(CommunitiesState.Loading)
    val state: StateFlow<CommunitiesState> = mutableState.asStateFlow()
    var communityNames: List<String> = emptyList()

    init {
        fetchCommunitiesForUser()
    }

    private fun fetchCommunitiesForUser() {
        getCurrentUser()
            .onSuccess { user ->
                val result = getCommunitiesForCurrentUser(user)
                    .onSuccess { communities ->
                        communityNames = communities.map { community -> community.name }
                        mutableState.value = CommunitiesState.Data(
                            user = userDisplayMapper.map(user),
                            communityIDs = communities.map { community -> community.id }
                        )
                    }
                    .onFailure { failure ->
                        mutableState.value = CommunitiesState.Failure(failure.message.toString())
                    }
            }
            .onFailure { failure ->
                mutableState.value = CommunitiesState.Failure(failure.message.toString())
            }
    }
}