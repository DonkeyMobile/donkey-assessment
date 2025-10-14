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
    
    init(name: String, username: String, userProfileImage: String, postImageName: String, description: String) {
        self.name = name
        self.username = username
        self.userProfileImage = 
        self.postImageName = postImageName
        self.description = description
    }
}
