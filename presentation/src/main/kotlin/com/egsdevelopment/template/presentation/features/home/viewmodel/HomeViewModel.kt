package com.egsdevelopment.template.presentation.features.home.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor() : ViewModel() {

    private val mutableState = MutableStateFlow<String>("")
    val _state: StateFlow<String> = mutableState.asStateFlow()

    init {
        viewModelScope.launch {
            mutableState.emit("Evert")
        }
    }
}