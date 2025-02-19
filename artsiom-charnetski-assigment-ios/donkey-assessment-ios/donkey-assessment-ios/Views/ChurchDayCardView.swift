//
//  ChurchDayCardView.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI

struct ChurchDayCardView: View {
    let item: ChurchDayItem
    @StateObject private var imageLoader = ImageLoader()

    init(item: ChurchDayItem) {
        self.item = item
    }

    var body: some View {
        VStack(alignment: .leading) {
            if let image = imageLoader.image {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                    .frame(height: 200)
                    .frame(maxWidth: .infinity)
                    .clipped()
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .overlay(
                        LinearGradient(gradient: Gradient(colors: [.black.opacity(0.5), .clear]),
                                       startPoint: .bottom,
                                       endPoint: .center)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    )
            } else if imageLoader.isLoading {
                ProgressView()
                    .frame(height: 200)
                    .frame(maxWidth: .infinity)
            } else {
                Image(systemName: "photo")
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(.gray)
                    .frame(height: 200)
                    .frame(maxWidth: .infinity)
            }
            
            Text(item.title)
                .font(.headline)
                .foregroundColor(.primary)
            
            Text(item.description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(2)
        }
        .frame(width: 200)
        .padding(15)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 15))
        .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: 4)
        .padding(.all)
        .onAppear {
            imageLoader.loadImage(url: item.imageURL)
        }
    }
}
