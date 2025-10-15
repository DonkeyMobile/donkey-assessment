//
//  PlanView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul on 14/10/2025.
//

import SwiftUI

struct PlanView: View {
    let plans: [Plan]
    var body: some View {
        VStack(alignment: .leading, spacing: 5){
            Text("Inspired Plans")
                .font(.title2)
            ScrollView(.horizontal, showsIndicators: false){
                HStack{
                    ForEach(plans) { plan in
                        PlanCard(plan: plan)
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading) // Zo zet je de VStack tegenover iets anders.
        .padding(.horizontal, 16)
    }
}
