//
//  GroupView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct GroupView: View {
    let groups: [Group]
    var body: some View {
        VStack(alignment: .leading, spacing: 5){
            Text("Church Groups")
                .font(.title2)
            ScrollView(.horizontal, showsIndicators: false){
                HStack{
                    ForEach(groups) { group in
                        GroupCard(group: group)
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading) // Zo zet je de VStack tegenover iets anders.
        .padding(.horizontal, 16)
    }
}


