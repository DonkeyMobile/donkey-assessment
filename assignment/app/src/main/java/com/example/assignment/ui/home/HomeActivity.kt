package com.example.assignment.ui.home

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.RecyclerView
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.base.BaseNavigationActivity
import com.example.assignment.ui.post.CreatePostActivity
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

class HomeActivity : BaseNavigationActivity() {
    private val viewModel: HomeViewModel by viewModels {
        HomeViewModel.Factory((application as App).database.postDao())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val userId = intent.getIntExtra("extra_user_id", -1)
        if (userId == -1) {
            finish()
            return
        }

        (application as App).userId = userId

        val rvPosts = findViewById<RecyclerView>(R.id.rvPosts)
        val adapter = PostAdapter()
        rvPosts.adapter = adapter

        val fabCreatePost = findViewById<FloatingActionButton>(R.id.fabCreatePost)
        fabCreatePost.setOnClickListener {
            startActivity(Intent(this, CreatePostActivity::class.java))
        }

        lifecycleScope.launch {
            viewModel.posts.collectLatest { pagingData ->
                adapter.submitData(pagingData)
            }
        }

        val navBar = findViewById<BottomNavigationView>(R.id.bottom_navigation)
        navBar.selectedItemId = R.id.navigation_home
        setupBottomNavigation(navBar)
    }
}