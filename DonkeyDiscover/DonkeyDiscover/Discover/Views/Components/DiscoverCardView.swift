//
//  DiscoverCardView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct DiscoverCardView: View {
    let item: DiscoverItem
    let kind: DiscoverSection.Kind

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.spacing.sm) {
            RemoteImage(url: item.imageURL)
                .frame(width: kind.imageSize.width, height: kind.imageSize.height)
                .clipShape(.rect(cornerRadius: kind.imageRadius))

            VStack(alignment: .leading, spacing: Theme.spacing.xxs) {
                Text(item.title)
                    .themed(kind.titleTypo)
                    .lineLimit(1)

                Text(item.description)
                    .themed(.bodySmall, color: .textSecondary)
                    .lineLimit(kind.descriptionLines, reservesSpace: true)
            }
        }
        .frame(width: kind.imageSize.width, alignment: .leading)
        .accessibilityElement(children: .combine)
    }
}

#Preview("Default") {
    VStack(alignment: .leading, spacing: Theme.spacing.lg) {
        DiscoverCardView(item: .preview, kind: .featured)
        DiscoverCardView(item: .preview, kind: .group)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Theme.color(.background))
}

#Preview("Long text") {
    VStack(alignment: .leading, spacing: Theme.spacing.lg) {
        DiscoverCardView(item: .previewLongText, kind: .featured)
        DiscoverCardView(item: .previewLongText, kind: .group)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Theme.color(.background))
}

#Preview("Image loading") {
    VStack(alignment: .leading, spacing: Theme.spacing.lg) {
        DiscoverCardView(item: .previewImageLoading, kind: .featured)
        DiscoverCardView(item: .previewImageLoading, kind: .group)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Theme.color(.background))
}

#Preview("Image failed") {
    VStack(alignment: .leading, spacing: Theme.spacing.lg) {
        DiscoverCardView(item: .previewImageFailed, kind: .featured)
        DiscoverCardView(item: .previewImageFailed, kind: .group)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Theme.color(.background))
}

#Preview("Dark mode") {
    VStack(alignment: .leading, spacing: Theme.spacing.lg) {
        DiscoverCardView(item: .preview, kind: .featured)
        DiscoverCardView(item: .preview, kind: .group)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Theme.color(.background))
    .preferredColorScheme(.dark)
}
