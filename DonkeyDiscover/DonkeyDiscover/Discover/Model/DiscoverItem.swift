//
//  DiscoverItem.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation

struct DiscoverItem: Identifiable, Hashable, Sendable {
    let id: String
    let title: String
    let description: String
    let imageURL: URL
    let largeImageURL: URL
}

// MARK: - Previews

extension DiscoverItem {
    static let preview = DiscoverItem(
        id: "preview",
        title: "Morning Light",
        description: "A five-minute reflection on Psalm 19 to start your day with gratitude.",
        imageURL: URL(string: "https://picsum.photos/seed/preview/800/520") ?? URL(filePath: "/"),
        largeImageURL: URL(string: "https://picsum.photos/seed/preview/1200/780")
            ?? URL(filePath: "/")
    )

    static let previewLongText = DiscoverItem(
        id: "preview-long",
        title: "Finding Grace in the Ordinary Moments of a Busy Week",
        description: """
            The dishes, the commute, the waiting room: a longer reflection on where God shows up \
            when nothing special seems to happen, and why those moments matter more than we think.
            """,
        imageURL: preview.imageURL,
        largeImageURL: preview.largeImageURL
    )

    static let previewImageLoading = DiscoverItem(
        id: "preview-image-loading",
        title: preview.title,
        description: preview.description,
        imageURL: URL(string: "https://192.0.2.1/image.jpg") ?? URL(filePath: "/"),
        largeImageURL: URL(string: "https://192.0.2.1/large.jpg") ?? URL(filePath: "/")
    )

    static let previewImageFailed = DiscoverItem(
        id: "preview-image-failed",
        title: preview.title,
        description: preview.description,
        imageURL: URL(filePath: "/failed"),
        largeImageURL: URL(filePath: "/failed")
    )
}
