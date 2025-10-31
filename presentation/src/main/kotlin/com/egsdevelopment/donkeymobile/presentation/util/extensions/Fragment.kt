package com.egsdevelopment.donkeymobile.presentation.util.extensions

import android.content.res.Configuration
import androidx.fragment.app.Fragment

fun Fragment.isDarkModeOn(): Boolean {
    val currentNightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    return currentNightMode == Configuration.UI_MODE_NIGHT_YES
}