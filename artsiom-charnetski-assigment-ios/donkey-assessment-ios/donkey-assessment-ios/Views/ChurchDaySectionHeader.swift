//
//  ChurchDaySectionHeader.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI

struct ChurchDaySectionHeader: View {
    let title: String

    var body: some View {
        HStack {
            Text(title)
                .font(.title2)
                .bold()
                .foregroundColor(.black)
                .padding()
            Spacer()
        }
        .frame(maxWidth: .infinity, minHeight: 50)
        .background(Color.white)
    }
}
