//
//  PlanCard.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct PlanCard: View {
    let plan: Plan
    var body: some View {
        VStack(alignment: .leading){
            Image(plan.planImageName)
                .resizable()
                .scaledToFill()
                .clipped()
                .frame(width: 200, height: 160)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
            
            Text(plan.title)
                .font(.footnote)
                .bold()
            
            Text(plan.description)
                .font(.footnote)
                .foregroundColor(.gray)
            
        }
        .frame(width: 200, height: 260, alignment: .topLeading) // Make sure that cards are same height and width
        .padding(.vertical, 20)
        .padding(.horizontal, 8)
    }
}

#Preview {
    PlanCard(plan: plans[0])
}

// Reusable helper

