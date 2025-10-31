package com.egsdevelopment.donkeymobile.presentation.features.profile.ui

import android.os.Bundle
import android.view.View
import androidx.core.view.WindowInsetsControllerCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.databinding.FragmentProfileBinding
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.ProfileDisplay
import com.egsdevelopment.donkeymobile.presentation.features.profile.viewmodel.ProfileViewModel
import com.egsdevelopment.donkeymobile.presentation.features.util.collectWithLifeCycle
import com.egsdevelopment.donkeymobile.presentation.util.extensions.applyWindowInsetTop
import com.egsdevelopment.donkeymobile.presentation.util.extensions.isDarkModeOn
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ProfileFragment : Fragment(R.layout.fragment_profile) {

    private var binding: FragmentProfileBinding? = null

    private val viewModel: ProfileViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        WindowInsetsControllerCompat(
            requireActivity().window,
            requireActivity().window.decorView
        ).isAppearanceLightStatusBars = !isDarkModeOn()
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
            avatar.setUser(profile.user)
            username.text = profile.user.username
            bio.text = profile.bio
        }
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