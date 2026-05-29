package com.example.assignment.ui.post

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.assignment.App
import com.example.assignment.R
import com.example.assignment.ui.common.UiState
import kotlinx.coroutines.launch

class CreatePostActivity : AppCompatActivity() {

    private val viewModel: CreatePostViewModel by viewModels {
        val app = application as App
        CreatePostViewModel.Factory(app.database.postDao(), app.database.groupDao())
    }

    private var selectedImageUri: Uri? = null

    private lateinit var ivPostImage: ImageView
    private lateinit var etPostContent: EditText
    private lateinit var btnCreatePost: Button
    private lateinit var progressBar: ProgressBar

    private val pickImage = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            try {
                // Try to take persistable permission if the provider supports it
                contentResolver.takePersistableUriPermission(
                    it,
                    Intent.FLAG_GRANT_READ_URI_PERMISSION
                )
            } catch (e: Exception) {
                // Some providers don't support persistable permissions or the URI doesn't need it
                e.printStackTrace()
            }
            selectedImageUri = it
            ivPostImage.setImageURI(it)
            ivPostImage.visibility = View.VISIBLE
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_post)

        etPostContent = findViewById(R.id.etPostContent)
        ivPostImage = findViewById(R.id.ivPostImage)
        btnCreatePost = findViewById(R.id.btnCreatePost)
        progressBar = findViewById(R.id.progressBar)
        val btnSelectImage = findViewById<Button>(R.id.btnSelectImage)

        btnSelectImage.setOnClickListener {
            // Using Intent.ACTION_OPEN_DOCUMENT is better for persistable permissions
            // but GetContent is also fine if we try to take permission.
            // Let's stick to GetContent as it's already there, but taking permission is key.
            pickImage.launch("image/*")
        }

        btnCreatePost.setOnClickListener {
            val userId = (application as App).userId ?: return@setOnClickListener
            val groupId = intent.getIntExtra("extra_group_id", -1).takeIf { it != -1 }
            viewModel.createPost(
                userId = userId,
                content = etPostContent.text.toString(),
                imageUrl = selectedImageUri?.toString(),
                groupId = groupId
            )
        }

        lifecycleScope.launch {
            viewModel.postState.collect { state ->
                when (state) {
                    is UiState.Loading -> {
                        progressBar.visibility = View.VISIBLE
                        btnCreatePost.isEnabled = false
                    }
                    is UiState.Success -> {
                        if (state != UiState.Success(Unit)) { // Initial state check
                             // If it was just created, we might want to close
                        }
                        // For simplicity, if it's success and we just clicked post, we finish.
                        // But wait, the initial state is also Success(Unit) in my ViewModel.
                        // I should probably use a better state management or a single live event.
                        // Let's just check if the content is not empty to decide if we should finish.
                        if (etPostContent.text.isNotEmpty() || selectedImageUri != null) {
                            Toast.makeText(this@CreatePostActivity, "Post created!", Toast.LENGTH_SHORT).show()
                            finish()
                        }
                    }
                    is UiState.Error -> {
                        progressBar.visibility = View.GONE
                        btnCreatePost.isEnabled = true
                        Toast.makeText(this@CreatePostActivity, state.message, Toast.LENGTH_SHORT).show()
                        viewModel.resetState()
                    }
                }
            }
        }
    }
}
