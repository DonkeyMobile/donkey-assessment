//
//  ListRowView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct ListRowView: View {
    let item: DiscoverItem

    private let kind = DiscoverSection.Kind.list

    var body: some View {
        HStack(spacing: Theme.spacing.md) {
            RemoteImage(url: item.imageURL)
                .frame(width: kind.imageSize.width, height: kind.imageSize.height)
                .clipShape(.rect(cornerRadius: kind.imageRadius))

            VStack(alignment: .leading, spacing: Theme.spacing.xxs) {
                Text(item.title)
                    .themed(kind.titleTypo)
                    .lineLimit(1)

                Text(item.description)
                    .themed(.bodySmall, color: .textSecondary)
                    .lineLimit(kind.descriptionLines)
            }

            Spacer(minLength: Theme.spacing.none)
        }
        .padding(.vertical, Theme.spacing.sm)
        .overlay(alignment: .bottom) {
            Rectangle()
                .fill(Theme.color(.border))
                .frame(height: 1)
        }
        .accessibilityElement(children: .combine)
    }
}

#Preview("Default") {
    ListRowView(item: .preview)
        .padding()
        .background(Theme.color(.background))
}

#Preview("Long text") {
    ListRowView(item: .previewLongText)
        .padding()
        .background(Theme.color(.background))
}

#Preview("Image loading") {
    ListRowView(item: .previewImageLoading)
        .padding()
        .background(Theme.color(.background))
}

#Preview("Image failed") {
    ListRowView(item: .previewImageFailed)
        .padding()
        .background(Theme.color(.background))
}

#Preview("Dark mode") {
    ListRowView(item: .preview)
        .padding()
        .background(Theme.color(.background))
        .preferredColorScheme(.dark)
}
