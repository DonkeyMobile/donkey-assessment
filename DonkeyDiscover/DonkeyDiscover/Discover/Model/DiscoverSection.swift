//
//  DiscoverSection.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation

struct DiscoverSection: Identifiable, Hashable, Sendable {
    let id: String
    let title: String
    let kind: Kind
    let items: [DiscoverItem]

    enum Kind: CaseIterable, Sendable {
        case hero
        case featured
        case group
        case banner
        case grid
        case list

        var fixedItemCount: Int? {
            switch self {
            case .hero, .banner: 1
            case .grid: 4
            case .list: 3
            case .featured, .group: nil
            }
        }

        var imageSize: CGSize {
            switch self {
            case .hero: CGSize(width: 400, height: 260)
            case .featured: CGSize(width: 240, height: 150)
            case .group: CGSize(width: 160, height: 160)
            case .banner: CGSize(width: 130, height: 170)
            case .grid: CGSize(width: 180, height: 120)
            case .list: CGSize(width: 52, height: 52)
            }
        }
    }
}

// MARK: - Placeholders

extension DiscoverSection {
    static let placeholders: [DiscoverSection] = [
        .placeholder(.hero),
        .placeholder(.featured),
        .placeholder(.group),
    ]

    static func placeholder(_ kind: Kind) -> DiscoverSection {
        let itemCount = kind.fixedItemCount ?? 6
        return DiscoverSection(
            id: "placeholder-\(kind)",
            title: "Daily Inspiration",
            kind: kind,
            items: (0..<itemCount)
                .map { index in
                    let imageURL = URL(
                        string: "https://picsum.photos/seed/\(kind)-\(index)/480/320"
                    )
                    return DiscoverItem(
                        id: "placeholder-\(kind)-\(index)",
                        title: DiscoverItem.preview.title,
                        description: DiscoverItem.preview.description,
                        imageURL: imageURL ?? URL(filePath: "/"),
                        largeImageURL: imageURL ?? URL(filePath: "/")
                    )
                }
        )
    }
}
