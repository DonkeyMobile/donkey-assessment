package com.example.assignment.ui.group

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.RecyclerView
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.home.PostAdapter
import com.example.assignment.ui.post.CreatePostActivity
import com.google.android.material.floatingactionbutton.FloatingActionButton
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

class GroupDetailActivity : AppCompatActivity() {

    private val groupId by lazy { intent.getIntExtra("extra_group_id", -1) }

    private val viewModel: GroupDetailViewModel by viewModels {
        val app = application as App
        GroupDetailViewModel.Factory(app.database.groupDao(), groupId, app.userId ?: -1)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_group_detail)

        val userId = (application as App).userId
        if (groupId == -1 || userId == null) return finish()

        val tvGroupName = findViewById<TextView>(R.id.tvGroupName)
        val rvGroupPosts = findViewById<RecyclerView>(R.id.rvGroupPosts)
        val fabCreateGroupPost = findViewById<FloatingActionButton>(R.id.fabCreateGroupPost)
        val btnJoinGroup = findViewById<Button>(R.id.btnJoinGroup)

        val adapter = PostAdapter()
        rvGroupPosts.adapter = adapter

        lifecycleScope.launch {
            viewModel.group.collect { group ->
                tvGroupName.text = group?.name ?: ""
            }
        }

        lifecycleScope.launch {
            viewModel.isJoined.collect { isJoined ->
                fabCreateGroupPost.visibility = if (isJoined) View.VISIBLE else View.GONE
                btnJoinGroup.visibility = if (isJoined) View.GONE else View.VISIBLE
            }
        }

        lifecycleScope.launch {
            viewModel.posts.collectLatest { pagingData ->
                adapter.submitData(pagingData)
            }
        }

        fabCreateGroupPost.setOnClickListener {
            startActivity(Intent(this, CreatePostActivity::class.java).apply {
                putExtra("extra_group_id", groupId)
            })
        }

        btnJoinGroup.setOnClickListener {
            viewModel.joinGroup()
        }
    }
}
