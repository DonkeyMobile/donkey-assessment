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
    Plan(title: "Walking in Faith", planImageName: "post3", description: "Discover how to trust God daily and walk confidently in His promises — one step at a time."),
    Plan(title: "Finding Peace in His Presence", planImageName: "post2", description: "Learn to slow down, breathe, and rest in God’s peace even when life feels uncertain or busy."),
    Plan(title: "Love in Action", planImageName: "post8", description: "A 7-day journey exploring how to live out Christ’s love through kindness, patience, and compassion."),
    Plan(title: "Strength in Surrender", planImageName: "post4", description: "True strength is found not in control, but in surrendering your plans to God’s perfect will."),
    Plan(title: "Rooted in Scripture", planImageName: "post1", description: "Grow deeper in your faith by spending intentional time in God’s Word and applying it to daily life.")
]
