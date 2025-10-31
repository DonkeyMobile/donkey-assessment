package com.egsdevelopment.donkeymobile.presentation.view

import android.content.Context
import android.graphics.drawable.GradientDrawable
import android.util.AttributeSet
import android.view.LayoutInflater
import androidx.annotation.ColorInt
import androidx.constraintlayout.widget.ConstraintLayout
import com.egsdevelopment.donkeymobile.presentation.databinding.ViewAvatarBinding
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay

class AvatarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr) {

    private val binding: ViewAvatarBinding = ViewAvatarBinding.inflate(
        LayoutInflater.from(context),
        this,
        true
    )

    fun setUser(userDisplay: UserDisplay) {
        setUserName(userDisplay.username)
        setUserBackgroundColor(userDisplay.avatarColor)
    }

    private fun setUserName(name: String) = binding.apply {
        avatarNameChar.text = name.first().toString().uppercase()
    }

    private fun setUserBackgroundColor(@ColorInt color: Int) = binding.apply {
        (avatarNameChar.background as? GradientDrawable)?.setColor(color)
    }

    fun setOnUserClick(
        onUserClick: () -> Unit
    ) = binding.apply {
        avatarNameChar.setOnClickListener {
            onUserClick()
        }
    }
}