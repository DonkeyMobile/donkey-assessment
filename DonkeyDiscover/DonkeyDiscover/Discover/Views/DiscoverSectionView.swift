//
//  DiscoverSectionView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct DiscoverSectionView: View {
    let section: DiscoverSection
    let namespace: Namespace.ID

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.spacing.sm) {
            if section.kind.showsHeader {
                Text(section.title)
                    .themed(.headline)
                    .accessibilityAddTraits(.isHeader)
                    .padding(.horizontal, Theme.spacing.md)
            }
            content
        }
    }

    @ViewBuilder
    private var content: some View {
        switch section.kind {
        case .featured, .group:
            carousel
        case .hero:
            if let item = section.items.first {
                link(to: item) {
                    OverlayCardView(item: item, kind: .hero, eyebrow: section.title)
                }
                .padding(.horizontal, Theme.spacing.md)
            }
        case .banner:
            if let item = section.items.first {
                link(to: item) {
                    BannerCardView(item: item, eyebrow: section.title)
                }
                .padding(.horizontal, Theme.spacing.md)
            }
        case .grid:
            grid
        case .list:
            VStack(spacing: Theme.spacing.none) {
                ForEach(section.items) { item in
                    link(to: item) {
                        ListRowView(item: item)
                    }
                }
            }
            .padding(.horizontal, Theme.spacing.md)
        }
    }

    private var carousel: some View {
        ScrollView(.horizontal) {
            LazyHStack(alignment: .top, spacing: Theme.spacing.md) {
                ForEach(Array(section.items.enumerated()), id: \.element.id) { index, item in
                    link(to: item) {
                        DiscoverCardView(item: item, kind: section.kind)
                    }
                    .onAppear {
                        let upcoming = section.items.dropFirst(index + 1).prefix(3)
                        ImageLoader.shared.prefetch(upcoming.map(\.imageURL))
                    }
                }
            }
            .scrollTargetLayout()
        }
        .contentMargins(.horizontal, Theme.spacing.md, for: .scrollContent)
        .scrollTargetBehavior(.viewAligned)
        .scrollIndicators(.hidden)
    }

    private var grid: some View {
        LazyVGrid(
            columns: [
                GridItem(.flexible(), spacing: Theme.spacing.md),
                GridItem(.flexible(), spacing: Theme.spacing.md),
            ],
            spacing: Theme.spacing.md
        ) {
            ForEach(section.items) { item in
                link(to: item) {
                    OverlayCardView(item: item, kind: .grid)
                }
            }
        }
        .padding(.horizontal, Theme.spacing.md)
    }

    private func link(to item: DiscoverItem, @ViewBuilder label: () -> some View) -> some View {
        NavigationLink(value: item, label: label)
            .buttonStyle(.plain)
            .zoomSource(id: item.id, in: namespace)
    }
}

#Preview("Hero") {
    SectionPreview(kind: .hero)
}

#Preview("Featured") {
    SectionPreview(kind: .featured)
}

#Preview("Group") {
    SectionPreview(kind: .group)
}

#Preview("Banner") {
    SectionPreview(kind: .banner)
}

#Preview("Grid") {
    SectionPreview(kind: .grid)
}

#Preview("List") {
    SectionPreview(kind: .list)
}

#Preview("Dark mode") {
    SectionPreview(kind: .featured)
        .preferredColorScheme(.dark)
}

private struct SectionPreview: View {
    let kind: DiscoverSection.Kind

    @Namespace private var namespace

    var body: some View {
        NavigationStack {
            DiscoverSectionView(section: .placeholder(kind), namespace: namespace)
                .padding(.vertical)
                .background(Theme.color(.background))
                .navigationDestination(for: DiscoverItem.self) { item in
                    DiscoverDetailView(item: item)
                        .zoomTransition(from: item.id, in: namespace)
                }
        }
    }
}
