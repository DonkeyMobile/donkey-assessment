//
//  PlanModel.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import Foundation
struct Plan: Identifiable {
    let id = UUID()
    let title: String
    let planImageName: String
    let description: String
    
    init(title: String, planImageName: String, description: String) {
        self.title = title
        self.planImageName = planImageName
        self.description = description
    }
}

let plans = [
    Plan(title: "something something title", planImageName: "post1", description: "Me and my bible"),
    Plan(title: "something something title", planImageName: "post2", description: "Different Description of what is going on in life"),
    Plan(title: "Walking and Talking", planImageName: "post3", description: "Hey are you interested in long walks of peace?"),
    Plan(title: "something something title", planImageName: "post4", description: "Me and my bible"),
    Plan(title: "something something title", planImageName: "post5", description: "Me and my bible"),
    
]
