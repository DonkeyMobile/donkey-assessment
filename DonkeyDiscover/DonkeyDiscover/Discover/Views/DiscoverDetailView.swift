//
//  DiscoverDetailView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct DiscoverDetailView: View {
    let item: DiscoverItem

    var body: some View {
        ScrollView {
            VStack(spacing: Theme.spacing.none) {
                RemoteImage(
                    url: item.largeImageURL,
                    thumbnailURL: item.imageURL
                )
                .frame(height: 420)

                VStack(alignment: .leading, spacing: Theme.spacing.sm) {
                    Text(item.title)
                        .themed(.titleLarge)
                    
                    Text(item.description)
                        .themed(.body, color: .textSecondary)
                }
                .padding(Theme.spacing.lg)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    Theme.color(.background),
                    in: .rect(
                        topLeadingRadius: Theme.radius.xl,
                        topTrailingRadius: Theme.radius.xl
                    )
                )
                .padding(.top, -Theme.radius.xl)
            }
        }
        .ignoresSafeArea(edges: .top)
        .background(Theme.color(.background))
        .navigationBarTitleDisplayMode(.inline)
        .toolbarBackground(.hidden, for: .navigationBar)
    }
}

#Preview("Default") {
    NavigationStack {
        DiscoverDetailView(item: .preview)
    }
}

#Preview("Long text") {
    NavigationStack {
        DiscoverDetailView(item: .previewLongText)
    }
}

#Preview("Dark mode") {
    NavigationStack {
        DiscoverDetailView(item: .preview)
    }
    .preferredColorScheme(.dark)
}
