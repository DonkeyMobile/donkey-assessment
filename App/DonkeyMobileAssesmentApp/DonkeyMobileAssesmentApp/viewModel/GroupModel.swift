//
//  GroupModel.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import Foundation
struct Group: Identifiable {
    let id = UUID()
    let title: String
    let groupImageName: String
    let description: String
    
    init(title: String, groupImageName: String, description: String) {
        self.title = title
        self.groupImageName = groupImageName
        self.description = description
    }
}
let groups = [
    Group(
        title: "Worship Team",
        groupImageName: "groupImage1",
        description: "Join our passionate team of musicians and vocalists who lead the church in heartfelt worship every Sunday."
    ),
    Group(
        title: "Youth Connect",
        groupImageName: "groupImage2",
        description: "A safe and fun space for teens to grow in faith, build friendships, and learn what it means to follow Jesus together."
    ),
    Group(
        title: "Young Adults",
        groupImageName: "groupImage3",
        description: "A vibrant community of students and professionals doing life together — growing in purpose, prayer, and connection."
    ),
    Group(
        title: "Bible Study Circle",
        groupImageName: "groupImage4",
        description: "Dive deep into Scripture each week with others who love exploring God’s Word and discussing its real-life impact."
    ),
    Group(
        title: "Outreach & Service",
        groupImageName: "groupImage5",
        description: "Be the hands and feet of Jesus in our city — serving meals, supporting families, and spreading hope in practical ways."
    )
]
