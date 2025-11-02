package com.egsdevelopment.donkeymobile.presentation.features.communities.ui

import android.os.Bundle
import android.view.View
import androidx.core.view.isGone
import androidx.core.view.isVisible
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
import com.egsdevelopment.donkeymobile.presentation.util.extensions.StatusBarMode
import com.egsdevelopment.donkeymobile.presentation.util.extensions.applyWindowInsetTop
import com.egsdevelopment.donkeymobile.presentation.util.extensions.setStatusBarMode
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CommunitiesFragment : Fragment(R.layout.fragment_communitites) {

    private var binding: FragmentCommunititesBinding? = null
    private var adapter: CommunitiesPagerAdapter? = null

    private val viewModel: CommunitiesViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setStatusBarMode(StatusBarMode.ICONS_LIGHT)
        binding = FragmentCommunititesBinding.bind(view)
        binding?.topbar?.applyWindowInsetTop()
        initPagerListener()
        initCollectors()
    }

    private fun initPagerListener() = binding?.apply {
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
            is CommunitiesState.Data -> onData(state)
            is CommunitiesState.Failure -> onFailure()
            CommunitiesState.Loading -> onLoading()
        }
    }

    private fun onData(state: CommunitiesState.Data) = binding?.apply {
        errorContainer.isGone = true
        loadingContainer.isGone = true
        topbar.setUser(state.user)
        topbar.setOnUserClick(::onUserClick)
        communitiesPager.adapter =
            CommunitiesPagerAdapter(this@CommunitiesFragment, state.communityIDs)
    }

    private fun onLoading() = binding?.apply {
        loadingContainer.isVisible = true
    }

    private fun onFailure() = binding?.apply {
        errorContainer.isVisible = true
    }

    private fun onUserClick() {
        findNavController().navigate(R.id.action_homeFragment_to_profileFragment)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        binding = null
    }
}