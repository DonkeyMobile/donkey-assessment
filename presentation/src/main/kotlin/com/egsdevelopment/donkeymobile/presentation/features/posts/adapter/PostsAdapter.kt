package com.egsdevelopment.donkeymobile.presentation.features.posts.adapter

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
import com.egsdevelopment.donkeymobile.presentation.features.profile.display.UserDisplay
import com.egsdevelopment.donkeymobile.presentation.view.AvatarView

class PostsAdapter(
    val posts: List<PostDisplay>
) : RecyclerView.Adapter<PostsAdapter.PostViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.view_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]
        with(holder) {
            setTitle(post.title)
            setMessage(post.message)
            setImageSrc(post.imageSrc)
            setUser(post.user)
            setTimeStamp(post.time)
        }
    }

    private fun PostViewHolder.setTitle(text: String) {
        title.text = text
    }

    private fun PostViewHolder.setMessage(text: String) {
        message.text = text
    }

    private fun PostViewHolder.setImageSrc(src: String?) {
        src?.let {
            image.isVisible = true
            Glide.with(image.context)
                .load(it)
                .into(image);
        } ?: run {
            image.setImageDrawable(null)
            image.isGone = true
        }
    }

    private fun PostViewHolder.setUser(user: UserDisplay) {
        avatar.setUser(user)
        userName.text = user.username
    }

    private fun PostViewHolder.setTimeStamp(text: String?) {
        timeStamp.text = text ?: itemView.context.getString(R.string.time_fallback)
    }

    override fun getItemCount(): Int {
        return posts.size
    }

    class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title: TextView = itemView.findViewById(R.id.post_title)
        val message: TextView = itemView.findViewById(R.id.post_message)
        val image: ImageView = itemView.findViewById(R.id.post_image)
        val timeStamp: TextView = itemView.findViewById(R.id.post_timestamp)
        val avatar: AvatarView = itemView.findViewById(R.id.post_avatar)
        val userName: TextView = itemView.findViewById(R.id.post_name)
    }
}