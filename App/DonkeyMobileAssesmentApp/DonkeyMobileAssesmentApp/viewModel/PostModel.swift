//
//  PostModel.swift
//  DonkeyMobileAssesmentApp
//
//  Created by Paul Tolnor on 14/10/2025.
//

import Foundation

struct Post: Identifiable {
    let id = UUID()
    let name: String
    let username: String
    let userProfileImage: String
    let postImageName: String
    let description: String
    
    init(name: String, username: String, postImageName: String, description: String) {
        self.name = name
        self.username = username
        self.userProfileImage = ["image1", "image2", "image3", "image4", "image5", "image6", "image7"].randomElement() ?? "default_image"
        self.postImageName = postImageName
        self.description = description
    }
}

let posts = [
    Post(name: "John", username: "john123", postImageName: "image1", description: "Me and my bible"),
    Post(name: "Mary", username: "mary_blessed", postImageName: "image2", description: "Faith moves mountains."),
    Post(name: "Luke", username: "luke_writer", postImageName: "image3", description: "Walking by faith, not by sight."),
    Post(name: "Sarah", username: "sarah_grace", postImageName: "image4", description: "Grace upon grace."),
    Post(name: "Peter", username: "peter_fisher", postImageName: "image5", description: "Let your light shine before others."),
    Post(name: "Rachel", username: "rachel_hope", postImageName: "image6", description: "Trust in the Lord with all your heart."),
    Post(name: "David", username: "david_psalmist", postImageName: "image7", description: "Be still and know that He is God.")
]
