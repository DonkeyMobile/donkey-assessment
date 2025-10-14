//
//  HomeView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView{
            ScrollView{
                StoryView()
                Divider()
                PostListView(posts:posts)
            }
            .navigationTitle("Following")
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Image(systemName: "line.3.horizontal")
                }
                ToolbarItem(placement: .navigationBarTrailing){
                    Image(systemName: "person.circle.fill")
                }
            }
//            .navigationBarItems(leading: Image(systemName: "pencil.and.outline"),
//                trailing: Image(systemName: "bell.fill"))
        }
    }
}

#Preview {
    HomeView()
}

