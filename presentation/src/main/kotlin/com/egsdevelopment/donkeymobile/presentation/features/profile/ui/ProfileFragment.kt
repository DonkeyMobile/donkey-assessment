package com.egsdevelopment.donkeymobile.presentation.features.profile.ui

import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.view.View
import androidx.annotation.ColorInt
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.databinding.FragmentProfileBinding
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.ProfileDisplay
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay
import com.egsdevelopment.donkeymobile.presentation.features.profile.viewmodel.ProfileViewModel
import com.egsdevelopment.donkeymobile.presentation.features.util.collectWithLifeCycle
import com.egsdevelopment.donkeymobile.presentation.util.extensions.applyWindowInsetTop
import dagger.hilt.android.AndroidEntryPoint
import kotlin.math.log

@AndroidEntryPoint
class ProfileFragment : Fragment(R.layout.fragment_profile) {

    private var binding: FragmentProfileBinding? = null

    private val viewModel: ProfileViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding = FragmentProfileBinding.bind(view)
        binding?.container?.applyWindowInsetTop()
        initCollectors()
        initLogoutButton()
    }

    private fun initCollectors() {
        viewModel.profile.collectWithLifeCycle(this, ::onProfile)
    }

    private fun onProfile(profile: ProfileDisplay?) = binding?.apply {
        profile?.let {
            setAvatar(profile.user)
            username.text = profile.user.username
            bio.text = profile.bio
        }
    }

    private fun setAvatar(userDisplay: UserDisplay) = binding?.apply {
        val background = avatar.background as? GradientDrawable
        background?.setColor(userDisplay.avatarColor)
        avatar.text = userDisplay.username.first().uppercase()
    }

    private fun initLogoutButton() = binding?.apply {
        logoutButton.setOnClickListener {
            viewModel.performLogOut() //normally would wait for a success in vm but now we can nav immediately
            findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        binding = null
    }
}