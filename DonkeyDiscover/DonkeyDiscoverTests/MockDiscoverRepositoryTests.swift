//
//  MockDiscoverRepositoryTests.swift
//  DonkeyDiscoverTests
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation
import Testing

@testable import DonkeyDiscover

struct MockDiscoverRepositoryTests {
    private let repository = MockDiscoverRepository(latency: .zero)

    @Test
    func firstPageHasPageSizeSections() async throws {
        let page = try await repository.page(0)

        #expect(page.sections.count == 20)
        #expect(page.hasMore)
    }

    @Test
    func contentIsDeterministic() async throws {
        let first = try await repository.page(3)
        let second = try await MockDiscoverRepository(latency: .zero).page(3)

        #expect(first == second)
    }

    @Test
    func lastPageEndsTheFeed() async throws {
        let repository = MockDiscoverRepository(pageSize: 20, totalSections: 50, latency: .zero)

        let page = try await repository.page(2)

        #expect(page.sections.count == 10)
        #expect(!page.hasMore)
    }

    @Test
    func pageBeyondTheEndIsEmpty() async throws {
        let repository = MockDiscoverRepository(totalSections: 10, latency: .zero)

        let page = try await repository.page(5)

        #expect(page.sections.isEmpty)
        #expect(!page.hasMore)
    }

    @Test
    func idsAreUniqueAcrossPages() async throws {
        var sectionIDs: [String] = []
        var itemIDs: [String] = []
        for index in 0..<5 {
            let page = try await repository.page(index)
            sectionIDs += page.sections.map(\.id)
            itemIDs += page.sections.flatMap(\.items).map(\.id)
        }

        #expect(Set(sectionIDs).count == sectionIDs.count)
        #expect(Set(itemIDs).count == itemIDs.count)
    }

    @Test
    func everyItemHasImageTitleAndDescription() async throws {
        let page = try await repository.page(0)

        for item in page.sections.flatMap(\.items) {
            #expect(!item.title.isEmpty)
            #expect(!item.description.isEmpty)
            #expect(item.imageURL.host() == "picsum.photos")
            #expect(item.largeImageURL.host() == "picsum.photos")
        }
    }

    @Test
    func everyKindAppearsOnAPage() async throws {
        let page = try await repository.page(0)

        let kinds = Set(page.sections.map(\.kind))

        #expect(kinds == Set(DiscoverSection.Kind.allCases))
    }
}
