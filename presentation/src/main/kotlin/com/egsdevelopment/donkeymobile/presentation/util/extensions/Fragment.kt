package com.egsdevelopment.donkeymobile.presentation.util.extensions

import android.content.res.Configuration
import androidx.core.view.WindowInsetsControllerCompat
import androidx.fragment.app.Fragment

fun Fragment.isDarkModeOn(): Boolean {
    val currentNightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    return currentNightMode == Configuration.UI_MODE_NIGHT_YES
}

enum class StatusBarMode {
    ICONS_LIGHT, ICONS_DARK
}

fun Fragment.setStatusBarMode(mode: StatusBarMode) {
    WindowInsetsControllerCompat(
        requireActivity().window,
        requireActivity().window.decorView
    ).isAppearanceLightStatusBars = when (mode) {
        StatusBarMode.ICONS_LIGHT -> false
        StatusBarMode.ICONS_DARK -> true
    }
}