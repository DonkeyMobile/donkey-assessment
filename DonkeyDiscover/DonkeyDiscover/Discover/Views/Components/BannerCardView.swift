//
//  BannerCardView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct BannerCardView: View {
    let item: DiscoverItem
    let eyebrow: String

    private let kind = DiscoverSection.Kind.banner

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.spacing.xxs) {
            Text(eyebrow)
                .themed(.caps, color: .accent)

            Text(item.title)
                .themed(kind.titleTypo)
                .lineLimit(2)

            Text(item.description)
                .themed(.bodySmall, color: .textSecondary)
                .lineLimit(kind.descriptionLines)
        }
        .padding(Theme.spacing.md)
        .frame(
            maxWidth: .infinity,
            minHeight: kind.imageSize.height,
            alignment: .leading
        )
        .padding(.trailing, kind.imageSize.width)
        .background(alignment: .trailing) {
            RemoteImage(url: item.imageURL, placeholder: .highlight)
                .frame(width: kind.imageSize.width)
        }
        .background(Theme.color(.highlight))
        .clipShape(.rect(cornerRadius: kind.imageRadius))
        .accessibilityElement(children: .combine)
    }
}

#Preview("Default") {
    BannerCardView(item: .preview, eyebrow: "Sermon of the Week")
        .padding()
        .background(Theme.color(.background))
}

#Preview("Long text") {
    BannerCardView(item: .previewLongText, eyebrow: "Sermon of the Week")
        .padding()
        .background(Theme.color(.background))
}

#Preview("Image loading") {
    BannerCardView(item: .previewImageLoading, eyebrow: "Sermon of the Week")
        .padding()
        .background(Theme.color(.background))
}

#Preview("Image failed") {
    BannerCardView(item: .previewImageFailed, eyebrow: "Sermon of the Week")
        .padding()
        .background(Theme.color(.background))
}

#Preview("Dark mode") {
    BannerCardView(item: .preview, eyebrow: "Sermon of the Week")
        .padding()
        .background(Theme.color(.background))
        .preferredColorScheme(.dark)
}
