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
            }
        }
    }
}

#Preview {
    HomeView()
}
