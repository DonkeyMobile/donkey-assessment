//
//  DiscoverRepository.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

protocol DiscoverRepository {
    func page(_ index: Int) async throws -> DiscoverPage
}

struct DiscoverPage: Equatable, Sendable {
    let sections: [DiscoverSection]
    let hasMore: Bool
}
