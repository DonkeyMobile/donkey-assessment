package com.egsdevelopment.donkeymobile.presentation.util.extensions

import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding

fun View.applyWindowInsetTop() {
    ViewCompat.setOnApplyWindowInsetsListener(this) { v, windowInsets ->
        val insets = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars())
        v.updatePadding(top = insets.top)
        WindowInsetsCompat.CONSUMED
    }
}