//
//  PostListView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct PostListView: View {
    let posts: [Post]
    var body: some View {
        VStack {
            ForEach(posts) { post in
                PostCard(post: post)
                    .listRowInsets(EdgeInsets())
                    .listRowSeparator(.hidden)
                    .padding(.vertical, 7)
            }
            
        }
        .listStyle(.plain)
    }
}

