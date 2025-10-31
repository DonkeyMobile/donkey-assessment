package com.egsdevelopment.donkeymobile.presentation.features.community.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.databinding.FragmentCommunityBinding
import com.egsdevelopment.donkeymobile.presentation.features.community.display.CommunityDisplay
import com.egsdevelopment.donkeymobile.presentation.features.community.viewmodel.CommunityViewModel
import com.egsdevelopment.donkeymobile.presentation.features.posts.adapter.PostsAdapter
import com.egsdevelopment.donkeymobile.presentation.features.util.collectWithLifeCycle
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CommunityFragment() : Fragment(R.layout.fragment_community) {
    companion object {
        private const val ARG_COMMUNITY_ID = "arg_community_id"

        fun newInstance(communityId: Int) = CommunityFragment().apply {
            arguments = Bundle().apply {
                putInt(ARG_COMMUNITY_ID, communityId)
            }
        }
    }

    private val communityId: Int
        get() = requireArguments().getInt(ARG_COMMUNITY_ID)
    private var binding: FragmentCommunityBinding? = null

    private val viewModel: CommunityViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding = FragmentCommunityBinding.bind(view)
        viewModel.fetchCommunity(communityId)
        initPostsRecycler()
        initCollectors()
    }

    private fun initPostsRecycler() = binding?.apply {
        posts.layoutManager = LinearLayoutManager(context)
    }

    private fun initCollectors() {
        viewModel.community.collectWithLifeCycle(this, ::onCommunity)
    }

    private fun onCommunity(communityDisplay: CommunityDisplay?) = binding?.apply {
        communityDisplay?.let {
            val adapter = PostsAdapter(it.posts)
            posts.adapter = adapter
        }
    }
}