package com.example.assignment.ui.group

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.RecyclerView
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.base.BaseNavigationActivity
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.launch

class GroupListActivity : BaseNavigationActivity() {

    private val viewModel: GroupListViewModel by viewModels {
        val app = application as App
        GroupListViewModel.Factory(app.database.groupDao(), app.userId ?: -1)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_group_list)

        val userId = (application as App).userId ?: return finish()

        val rvGroups = findViewById<RecyclerView>(R.id.rvGroups)
        val adapter = GroupAdapter(
            onJoinClick = { group ->
                viewModel.joinGroup(userId, group.id)
            },
            onGroupClick = { group ->
                startActivity(Intent(this, GroupDetailActivity::class.java).apply {
                    putExtra("extra_group_id", group.id)
                })
            }
        )
        rvGroups.adapter = adapter

        lifecycleScope.launch {
            viewModel.allGroups.collect { groups ->
                if (groups.isEmpty()) {
                    viewModel.createInitialGroups()
                }
                adapter.submitList(groups)
            }
        }

        val navBar = findViewById<BottomNavigationView>(R.id.bottom_navigation)
        navBar.selectedItemId = R.id.navigation_dashboard
        setupBottomNavigation(navBar)
    }
}
