package com.egsdevelopment.donkeymobile.presentation.features.util

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

fun <T> StateFlow<T>.collectWithLifeCycle(viewLifecycleOwner: LifecycleOwner, onState: (T) -> Unit) {
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            collect { state ->
                onState(state)
            }
        }
    }
}

fun <T> SharedFlow<T>.collectWithLifeCycle(viewLifecycleOwner: LifecycleOwner, onState: (T) -> Unit) {
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            collectLatest { state ->
                onState(state)
            }
        }
    }
}