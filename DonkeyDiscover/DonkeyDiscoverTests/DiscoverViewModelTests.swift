//
//  DiscoverViewModelTests.swift
//  DonkeyDiscoverTests
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation
import Testing

@testable import DonkeyDiscover

struct DiscoverViewModelTests {
    @Test
    func loadFirstPageShowsSections() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        let viewModel = DiscoverViewModel(repository: repository)

        await viewModel.loadFirstPage()

        #expect(viewModel.sections.count == StubDiscoverRepository.sectionsPerPage)
        #expect(viewModel.state == .loaded)
        #expect(viewModel.hasMore)
    }

    @Test
    func loadFirstPageRunsOnlyOnce() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        let viewModel = DiscoverViewModel(repository: repository)

        await viewModel.loadFirstPage()
        await viewModel.loadFirstPage()

        #expect(repository.requestedPages == [0])
    }

    @Test
    func loadsMoreNearTheEnd() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        let viewModel = DiscoverViewModel(repository: repository)
        await viewModel.loadFirstPage()

        await viewModel.loadMoreIfNeeded(currentIndex: viewModel.sections.count - 1)

        #expect(repository.requestedPages == [0, 1])
        #expect(viewModel.sections.count == StubDiscoverRepository.sectionsPerPage * 2)
    }

    @Test
    func doesNotLoadMoreFarFromTheEnd() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        let viewModel = DiscoverViewModel(repository: repository)
        await viewModel.loadFirstPage()

        await viewModel.loadMoreIfNeeded(currentIndex: 0)

        #expect(repository.requestedPages == [0])
    }

    @Test
    func stopsAtTheEndOfTheFeed() async {
        let repository = StubDiscoverRepository(pageCount: 1)
        let viewModel = DiscoverViewModel(repository: repository)

        await viewModel.loadNextPage()
        await viewModel.loadNextPage()

        #expect(repository.requestedPages == [0])
        #expect(!viewModel.hasMore)
    }

    @Test
    func concurrentRequestsLoadOnce() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        repository.holdsResponses = true
        let viewModel = DiscoverViewModel(repository: repository)

        let first = Task { await viewModel.loadNextPage() }
        while repository.requestedPages.isEmpty {
            await Task.yield()
        }
        await viewModel.loadNextPage()
        repository.releaseResponses()
        await first.value

        #expect(repository.requestedPages == [0])
        #expect(viewModel.sections.count == StubDiscoverRepository.sectionsPerPage)
    }

    @Test
    func failureCanBeRetried() async {
        let repository = StubDiscoverRepository(pageCount: 3)
        repository.error = URLError(.notConnectedToInternet)
        let viewModel = DiscoverViewModel(repository: repository)

        await viewModel.loadNextPage()
        let offline = DiscoverViewModel.message(for: URLError(.notConnectedToInternet))
        #expect(viewModel.state == .failed(offline))
        #expect(viewModel.sections.isEmpty)

        repository.error = nil
        await viewModel.loadNextPage()
        #expect(viewModel.state == .loaded)
        #expect(viewModel.sections.count == StubDiscoverRepository.sectionsPerPage)
        #expect(repository.requestedPages == [0, 0])
    }

    @Test
    func offlineErrorExplainsTheConnection() {
        let message = DiscoverViewModel.message(for: URLError(.notConnectedToInternet))

        #expect(message.contains("offline"))
    }

    @Test
    func otherErrorsGetAGenericMessage() {
        let message = DiscoverViewModel.message(for: URLError(.badServerResponse))

        #expect(message == "Something went wrong. Please try again.")
    }
}

private final class StubDiscoverRepository: DiscoverRepository {
    static let sectionsPerPage = 10

    let pageCount: Int
    var error: (any Error)?
    var holdsResponses = false
    private(set) var requestedPages: [Int] = []
    private var heldResponses: [CheckedContinuation<Void, Never>] = []

    init(pageCount: Int) {
        self.pageCount = pageCount
    }

    func page(_ index: Int) async throws -> DiscoverPage {
        requestedPages.append(index)
        if holdsResponses {
            await withCheckedContinuation { heldResponses.append($0) }
        }
        if let error {
            throw error
        }

        let sections = (0..<Self.sectionsPerPage)
            .map { offset in
                section(id: "\(index)-\(offset)")
            }
        return DiscoverPage(sections: sections, hasMore: index < pageCount - 1)
    }

    func releaseResponses() {
        heldResponses.forEach { $0.resume() }
        heldResponses.removeAll()
    }
}

private func section(id: String) -> DiscoverSection {
    DiscoverSection(
        id: id,
        title: "Section \(id)",
        kind: .featured,
        items: [
            DiscoverItem(
                id: "\(id)-item",
                title: "Item",
                description: "Description",
                imageURL: URL(filePath: "/\(id)"),
                largeImageURL: URL(filePath: "/\(id)-large")
            )
        ]
    )
}
