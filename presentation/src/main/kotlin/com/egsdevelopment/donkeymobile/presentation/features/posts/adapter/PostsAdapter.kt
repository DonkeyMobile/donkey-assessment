package com.egsdevelopment.donkeymobile.presentation.features.posts.adapter

import android.graphics.drawable.GradientDrawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.isGone
import androidx.core.view.isVisible
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.egsdevelopment.donkeymobile.presentation.R
import com.egsdevelopment.donkeymobile.presentation.features.posts.display.PostDisplay

class PostsAdapter(
    val posts: List<PostDisplay>
) : RecyclerView.Adapter<PostsAdapter.PostViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.view_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]
        holder.title.text = post.title
        holder.message.text = post.message
        post.imageSrc?.let { src ->
            holder.image.isVisible = true
            Glide.with(holder.image.context)
                .load(src)
                .into(holder.image);
        } ?: run {
            holder.image.setImageDrawable(null)
            holder.image.isGone = true
        }
        (holder.avatar.background as? GradientDrawable)?.setColor(post.user.avatarColor)
        holder.avatar.text = post.user.username.first().toString().uppercase()
        holder.userName.text = post.user.username
        holder.timeStamp.text = post.time
    }

    override fun getItemCount(): Int {
        return posts.size
    }

    class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title: TextView = itemView.findViewById(R.id.post_title)
        val message: TextView = itemView.findViewById(R.id.post_message)
        val image: ImageView = itemView.findViewById(R.id.post_image)
        val timeStamp: TextView = itemView.findViewById(R.id.post_timestamp)
        val avatar: TextView = itemView.findViewById(R.id.post_avatar)
        val userName: TextView = itemView.findViewById(R.id.post_name)
    }
}