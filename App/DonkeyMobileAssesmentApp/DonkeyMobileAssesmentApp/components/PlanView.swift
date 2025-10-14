//
//  PlanView.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import SwiftUI

struct PlanView: View {
    let plans: [Plan]
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false){
            HStack{
                ForEach(plans) { plan in
                    PlanCard(plan: plan)
                }
            }
        }
    }
}
