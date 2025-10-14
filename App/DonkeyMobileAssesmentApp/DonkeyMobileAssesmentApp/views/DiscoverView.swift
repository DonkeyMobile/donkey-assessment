//
//  DiscoverView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct DiscoverView: View {
    var body: some View {
        NavigationView{
            ScrollView{
                PlanView(plans: plans)
                Divider()
                //GroupView(groups:groups)
            }
            .navigationTitle("Discover")
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
    DiscoverView()
}
