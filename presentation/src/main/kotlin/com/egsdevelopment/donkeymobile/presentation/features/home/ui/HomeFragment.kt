package com.egsdevelopment.donkeymobile.presentation.features.home.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.databinding.FragmentHomeBinding
import com.egsdevelopment.donkeymobile.presentation.features.home.viewmodel.HomeViewModel
import com.egsdevelopment.donkeymobile.presentation.features.util.collectWithLifeCycle
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class HomeFragment : Fragment(R.layout.fragment_home) {

    private var binding: FragmentHomeBinding? = null

    private val viewModel: HomeViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding = FragmentHomeBinding.bind(view)
        initCollectors()
    }

    private fun initCollectors() {
        viewModel._state.collectWithLifeCycle(this, ::onState)
    }

    private fun onState(state: String) = binding?.apply {
        homeText.text = state

    }

    override fun onDestroyView() {
        super.onDestroyView()
        binding = null
    }
}