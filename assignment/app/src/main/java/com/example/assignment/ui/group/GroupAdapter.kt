package com.example.assignment.ui.group

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.assignment.R
import com.example.assignment.data.GroupWithMembership

class GroupAdapter(private val onJoinClick: (GroupWithMembership) -> Unit, private val onGroupClick: (GroupWithMembership) -> Unit) :
    ListAdapter<GroupWithMembership, GroupAdapter.GroupViewHolder>(GroupDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GroupViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_group, parent, false)
        return GroupViewHolder(view)
    }

    override fun onBindViewHolder(holder: GroupViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class GroupViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvGroupName: TextView = itemView.findViewById(R.id.tvGroupName)
        private val tvGroupDescription: TextView = itemView.findViewById(R.id.tvGroupDescription)
        private val btnJoin: Button = itemView.findViewById(R.id.btnJoin)

        fun bind(group: GroupWithMembership) {
            tvGroupName.text = group.name
            tvGroupDescription.text = group.description
            btnJoin.visibility = if (group.isJoined) View.GONE else View.VISIBLE
            btnJoin.setOnClickListener { onJoinClick(group) }
            itemView.setOnClickListener { onGroupClick(group) }
        }
    }

    class GroupDiffCallback : DiffUtil.ItemCallback<GroupWithMembership>() {
        override fun areItemsTheSame(oldItem: GroupWithMembership, newItem: GroupWithMembership) = oldItem.id == newItem.id
        override fun areContentsTheSame(oldItem: GroupWithMembership, newItem: GroupWithMembership) = oldItem == newItem
    }
}
