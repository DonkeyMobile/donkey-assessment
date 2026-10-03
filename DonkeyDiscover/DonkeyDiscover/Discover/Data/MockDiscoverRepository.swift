//
//  MockDiscoverRepository.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation

struct MockDiscoverRepository: DiscoverRepository {
    var pageSize = 20
    var totalSections = 1_000
    var itemsPerSection = 10...50
    var latency: Duration = .milliseconds(400)

    func page(_ index: Int) async throws -> DiscoverPage {
        try await Task.sleep(for: latency)

        let start = index * pageSize
        let end = min(start + pageSize, totalSections)
        guard start < end else {
            return DiscoverPage(sections: [], hasMore: false)
        }

        return DiscoverPage(
            sections: (start..<end).map(makeSection),
            hasMore: end < totalSections
        )
    }

    private func makeSection(at index: Int) -> DiscoverSection {
        let kind = DiscoverSection.Kind.allCases[index % DiscoverSection.Kind.allCases.count]
        let content = MockContent(kind: kind)
        let itemCount =
            kind.fixedItemCount
            ?? itemsPerSection.lowerBound + (index * 7) % itemsPerSection.count
        let offset = index % content.items.count

        let items = (0..<itemCount)
            .map { itemIndex in
                let entry = content.items[wrapping: offset + itemIndex]
                let key = "\(index)-\(itemIndex)"
                let size = kind.imageSize
                return DiscoverItem(
                    id: key,
                    title: entry.title,
                    description: entry.description,
                    imageURL: imageURL(key: key, width: size.width * 2, size: size),
                    largeImageURL: imageURL(key: key, width: Self.largeImageWidth, size: size)
                )
            }

        return DiscoverSection(
            id: "\(index)",
            title: content.sectionTitles[
                (index / DiscoverSection.Kind.allCases.count) % content.sectionTitles.count
            ],
            kind: kind,
            items: items
        )
    }

    private func imageURL(key: String, width: CGFloat, size: CGSize) -> URL {
        let height = width * size.height / size.width
        return Self.picsumURL.appending(path: "seed/\(key)/\(Int(width))/\(Int(height))")
    }

    private static let largeImageWidth: CGFloat = 1_200

    private static let picsumURL: URL = {
        guard let url = URL(string: "https://picsum.photos") else {
            preconditionFailure("The Lorem Picsum base URL is invalid.")
        }
        return url
    }()
}

private extension Array {
    subscript(wrapping index: Int) -> Element {
        self[index % count]
    }
}
