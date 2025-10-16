//
//  GroupCard.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul on 14/10/2025.
//

import SwiftUI

struct GroupCard: View {
    let group: Group
    var body: some View {
        VStack(alignment: .leading){
            Image(group.groupImageName)
                .resizable()
                .scaledToFill()
                .clipped()
                .frame(width: 200, height: 240)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
            
            Text(group.title)
                .font(.footnote)
                .bold()
            
            Text(group.description)
                .font(.footnote)
                .foregroundColor(.gray)
            
        }
        .frame(width: 200, height: 340, alignment: .topLeading) // Make sure that cards are same height and width
        .padding(.vertical, 20)
        .padding(.horizontal, 8)
    }
}

#Preview {
    GroupCard(group: groups[0])
}


