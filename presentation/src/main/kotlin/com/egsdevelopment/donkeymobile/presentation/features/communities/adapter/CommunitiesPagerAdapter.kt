package com.egsdevelopment.donkeymobile.presentation.features.communities.adapter

import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.egsdevelopment.donkeymobile.presentation.features.community.ui.CommunityFragment

class CommunitiesPagerAdapter(
    fragment: Fragment,
    private val communityIds: List<Int>
) : FragmentStateAdapter(fragment) {

    override fun getItemCount(): Int = communityIds.size

    override fun createFragment(position: Int): Fragment {
        val id = communityIds[position]
        return CommunityFragment.newInstance(id)
    }
}