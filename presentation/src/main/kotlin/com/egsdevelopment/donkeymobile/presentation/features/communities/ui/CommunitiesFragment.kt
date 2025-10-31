package com.egsdevelopment.donkeymobile.presentation.features.communities.ui

import android.os.Bundle
import android.view.View
import androidx.core.view.WindowInsetsControllerCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.viewpager2.widget.ViewPager2
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.databinding.FragmentCommunititesBinding
import com.egsdevelopment.donkeymobile.presentation.features.communities.adapter.CommunitiesPagerAdapter
import com.egsdevelopment.donkeymobile.presentation.features.communities.state.CommunitiesState
import com.egsdevelopment.donkeymobile.presentation.features.communities.viewmodel.CommunitiesViewModel
import com.egsdevelopment.donkeymobile.presentation.features.util.collectWithLifeCycle
import com.egsdevelopment.donkeymobile.presentation.util.extensions.applyWindowInsetTop
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CommunitiesFragment : Fragment(R.layout.fragment_communitites) {

    private var binding: FragmentCommunititesBinding? = null
    private var adapter: CommunitiesPagerAdapter? = null

    private val viewModel: CommunitiesViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        WindowInsetsControllerCompat(requireActivity().window, requireActivity().window.decorView).isAppearanceLightStatusBars = false
        binding = FragmentCommunititesBinding.bind(view)
        binding?.topbar?.applyWindowInsetTop()
        initPager()
        initCollectors()
    }

    private fun initPager() = binding?.apply {
        communitiesPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                binding?.apply {
                    topbar.setTitle(viewModel.communityNames[position])
                }
            }
        })
    }

    private fun initCollectors() {
        viewModel.state.collectWithLifeCycle(this, ::onState)
    }

    private fun onState(state: CommunitiesState) = binding?.apply {
        when (state) {
            is CommunitiesState.Data -> {
                topbar.setUser(state.user)
                topbar.setOnUserClick(::onUserClick)
                communitiesPager.adapter =
                    CommunitiesPagerAdapter(this@CommunitiesFragment, state.communityIDs)
            }

            is CommunitiesState.Failure -> TODO()
            CommunitiesState.Loading -> TODO()
        }
    }

    private fun onUserClick() {
        findNavController().navigate(R.id.action_homeFragment_to_profileFragment)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        binding = null
    }
}