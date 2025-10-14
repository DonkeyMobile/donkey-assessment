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
//    let title: String
    let userProfileImage: String
    let postImageName: String
    let description: String
    
    init(name: String, username:String, userProfileImage: String,  postImageName: String, description: String) {
        self.name = name
        self.username = username
//        self.title = title
        self.userProfileImage = userProfileImage
        self.postImageName = postImageName
        self.description = description
    }
}

let posts = [
    Post(name: "John", username: "john123", userProfileImage: "image1", postImageName: "post1", description: "Me and my bible"),
    Post(name: "Mary", username: "mary_blessed",userProfileImage: "image2", postImageName: "post2", description: "Faith moves mountains."),
    Post(name: "Luke", username: "luke_writer",userProfileImage: "image3", postImageName: "post3", description: "Walking by faith, not by sight."),
    Post(name: "Sarah", username: "sarah_grace",userProfileImage: "image4", postImageName: "post4", description: "Grace upon grace."),
    Post(name: "Peter", username: "peter_fisher",userProfileImage: "image5", postImageName: "post5", description: "Let your light shine before others."),
    Post(name: "Rachel", username: "rachel_hope",userProfileImage: "image6", postImageName: "post6", description: "Trust in the Lord with all your heart."),
    Post(name: "David", username: "david_psalmist",userProfileImage: "image7", postImageName: "post7", description: "Be still and know that He is God.")
]
