//
//  OverlayCardView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct OverlayCardView: View {
    let item: DiscoverItem
    let kind: DiscoverSection.Kind
    var eyebrow: String?

    var body: some View {
        text
            .padding(kind == .hero ? Theme.spacing.lg : Theme.spacing.md)
            .frame(
                maxWidth: .infinity,
                minHeight: kind.imageSize.height,
                alignment: .bottomLeading
            )
            .background {
                RemoteImage(url: item.imageURL)
                    .overlay {
                        LinearGradient(
                            colors: [
                                Theme.color(.scrim, opacity: 0),
                                Theme.color(.scrim, opacity: 0.7),
                            ],
                            startPoint: .center,
                            endPoint: .bottom
                        )
                    }
            }
            .clipShape(.rect(cornerRadius: kind.imageRadius))
            .shadow(
                color: Theme.color(.scrim, opacity: 0.15),
                radius: 12,
                y: 6
            )
            .accessibilityElement(children: .combine)
    }

    private var text: some View {
        VStack(alignment: .leading, spacing: Theme.spacing.xxs) {
            if let eyebrow {
                Text(eyebrow)
                    .themed(.caps, color: .textOnImage)
            }
            Text(item.title)
                .themed(kind.titleTypo, color: .textOnImage)
                .lineLimit(2)
            Text(item.description)
                .themed(.bodySmall, color: .textOnImage)
                .opacity(0.85)
                .lineLimit(kind.descriptionLines)
        }
    }
}

#Preview("Default") {
    VStack(spacing: Theme.spacing.lg) {
        OverlayCardView(item: .preview, kind: .hero, eyebrow: "This Sunday")
        OverlayCardView(item: .preview, kind: .grid)
            .frame(width: 180)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding()
    .background(Theme.color(.background))
}

#Preview("Long text") {
    VStack(spacing: Theme.spacing.lg) {
        OverlayCardView(item: .previewLongText, kind: .hero, eyebrow: "This Sunday")
        OverlayCardView(item: .previewLongText, kind: .grid)
            .frame(width: 180)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding()
    .background(Theme.color(.background))
}

#Preview("Image loading") {
    VStack(spacing: Theme.spacing.lg) {
        OverlayCardView(item: .previewImageLoading, kind: .hero, eyebrow: "This Sunday")
        OverlayCardView(item: .previewImageLoading, kind: .grid)
            .frame(width: 180)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding()
    .background(Theme.color(.background))
}

#Preview("Image failed") {
    VStack(spacing: Theme.spacing.lg) {
        OverlayCardView(item: .previewImageFailed, kind: .hero, eyebrow: "This Sunday")
        OverlayCardView(item: .previewImageFailed, kind: .grid)
            .frame(width: 180)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding()
    .background(Theme.color(.background))
}

#Preview("Dark mode") {
    VStack(spacing: Theme.spacing.lg) {
        OverlayCardView(item: .preview, kind: .hero, eyebrow: "This Sunday")
        OverlayCardView(item: .preview, kind: .grid)
            .frame(width: 180)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding()
    .background(Theme.color(.background))
    .preferredColorScheme(.dark)
}
