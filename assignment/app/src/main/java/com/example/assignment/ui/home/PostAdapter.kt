package com.example.assignment.ui.home

import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.paging.PagingDataAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.example.assignment.R
import com.example.assignment.data.PostWithAuthor
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import androidx.core.net.toUri

class PostAdapter : PagingDataAdapter<PostWithAuthor, PostAdapter.PostViewHolder>(PostDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        getItem(position)?.let { holder.bind(it) }
    }

    class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvAuthorName: TextView = itemView.findViewById(R.id.tvAuthorName)
        private val tvGroupName: TextView = itemView.findViewById(R.id.tvGroupName)
        private val tvPostContent: TextView = itemView.findViewById(R.id.tvPostContent)
        private val ivPostImage: ImageView = itemView.findViewById(R.id.ivPostImage)
        private val tvCreatedAt: TextView = itemView.findViewById(R.id.tvCreatedAt)

        private val dateFormat = SimpleDateFormat("MMM dd, yyyy HH:mm", Locale.getDefault())

        fun bind(post: PostWithAuthor) {
            tvAuthorName.text = post.authorName

            if (post.groupName != null) {
                tvGroupName.visibility = View.VISIBLE
                tvGroupName.text = "in ${post.groupName}"
            } else {
                tvGroupName.visibility = View.GONE
            }
            
            if (post.content.isNullOrBlank()) {
                tvPostContent.visibility = View.GONE
            } else {
                tvPostContent.visibility = View.VISIBLE
                tvPostContent.text = post.content
            }

            if (post.imageUrl.isNullOrBlank()) {
                ivPostImage.visibility = View.GONE
            } else {
                ivPostImage.visibility = View.VISIBLE
                try {
                    ivPostImage.setImageURI(Uri.parse(post.imageUrl))
                } catch (e: SecurityException) {
                    // Handle cases where permission is lost
                    ivPostImage.visibility = View.GONE
                    e.printStackTrace()
                }
            }


            tvCreatedAt.text = dateFormat.format(Date(post.createdAt))
        }
    }

    class PostDiffCallback : DiffUtil.ItemCallback<PostWithAuthor>() {
        override fun areItemsTheSame(oldItem: PostWithAuthor, newItem: PostWithAuthor): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: PostWithAuthor, newItem: PostWithAuthor): Boolean {
            return oldItem == newItem
        }
    }
}
