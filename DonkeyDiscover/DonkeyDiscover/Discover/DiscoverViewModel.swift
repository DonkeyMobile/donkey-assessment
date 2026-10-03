//
//  DiscoverViewModel.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation
import Observation

@Observable
final class DiscoverViewModel {
    enum State: Equatable {
        case idle
        case loading
        case loaded
        case failed(String)
    }

    static let prefetchDistance = 5

    private(set) var sections: [DiscoverSection] = []
    private(set) var state: State = .idle
    private(set) var hasMore = true

    @ObservationIgnored private let repository: any DiscoverRepository
    @ObservationIgnored private var nextPage = 0

    init(repository: any DiscoverRepository = MockDiscoverRepository()) {
        self.repository = repository
    }

    func loadFirstPage() async {
        guard sections.isEmpty else { return }
        await loadNextPage()
    }

    func loadMoreIfNeeded(currentIndex: Int) async {
        guard currentIndex >= sections.count - Self.prefetchDistance else { return }
        await loadNextPage()
    }

    func loadNextPage() async {
        guard state != .loading, hasMore else { return }
        state = .loading

        do {
            let page = try await repository.page(nextPage)
            sections.append(contentsOf: page.sections)
            hasMore = page.hasMore
            nextPage += 1
            state = .loaded
        } catch is CancellationError {
            state = .idle
        } catch {
            state = .failed(Self.message(for: error))
        }
    }

    static func message(for error: any Error) -> String {
        switch (error as? URLError)?.code {
        case .notConnectedToInternet, .networkConnectionLost, .dataNotAllowed:
            "You seem to be offline. Check your connection and try again."
        default:
            "Something went wrong. Please try again."
        }
    }
}
