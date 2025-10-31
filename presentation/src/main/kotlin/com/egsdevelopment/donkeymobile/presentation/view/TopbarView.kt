package com.egsdevelopment.donkeymobile.presentation.view

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import androidx.constraintlayout.widget.ConstraintLayout
import com.egsdevelopment.donkeymobile.presentation.databinding.ViewTopbarBinding
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay

class TopbarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr) {

    private val binding: ViewTopbarBinding = ViewTopbarBinding.inflate(
        LayoutInflater.from(context),
        this,
        true
    )

    fun setUser(userDisplay: UserDisplay) = binding.apply {
        avatar.setUser(userDisplay)
    }

    fun setOnUserClick(
        onUserClick: () -> Unit
    ) = binding.apply {
        avatar.setOnUserClick(onUserClick)
    }

    fun setTitle(text: String) = binding.apply {
        title.text = text
    }
}