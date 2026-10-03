//
//  DiscoverSection.Kind+Style.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

extension DiscoverSection.Kind {
    var showsHeader: Bool {
        self != .hero && self != .banner
    }

    var imageRadius: CGFloat {
        switch self {
        case .hero: Theme.radius.xl
        case .featured, .group, .banner, .grid: Theme.radius.lg
        case .list: Theme.radius.md
        }
    }

    var titleTypo: ThemeTypo {
        switch self {
        case .hero: .titleLarge
        case .banner: .headline
        case .featured: .title
        case .group, .grid, .list: .titleSmall
        }
    }

    var descriptionLines: Int {
        switch self {
        case .banner: 3
        case .hero, .featured: 2
        case .group, .grid, .list: 1
        }
    }
}
