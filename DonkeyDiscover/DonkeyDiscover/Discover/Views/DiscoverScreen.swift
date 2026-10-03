//
//  DiscoverScreen.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct DiscoverScreen: View {
    @State private var viewModel: DiscoverViewModel
    @Namespace private var namespace
    @State private var topSectionID: DiscoverSection.ID?

    init(
        repository: any DiscoverRepository = MockDiscoverRepository()
    ) {
        _viewModel = State(initialValue: DiscoverViewModel(repository: repository))
    }

    var body: some View {
        NavigationStack {
            content
                .background(Theme.color(.background))
                .navigationTitle("Discover")
                .navigationDestination(for: DiscoverItem.self) { item in
                    DiscoverDetailView(item: item)
                        .zoomTransition(from: item.id, in: namespace)
                }
                .safeAreaInset(edge: .bottom) {
                    bottomBar
                }
        }
        .tint(Theme.color(.accent))
        .task {
            await viewModel.loadFirstPage()
        }
    }

    @ViewBuilder
    private var content: some View {
        if !viewModel.sections.isEmpty {
            feed
        } else if case .failed(let message) = viewModel.state {
            ContentUnavailableView {
                Label("Couldn't load Discover", systemImage: "wifi.exclamationmark")
            } description: {
                Text(message)
            } actions: {
                retryButton
            }
        } else {
            skeleton
        }
    }

    private var showsScrollToTop: Bool {
        guard let topSectionID else { return false }
        return topSectionID != viewModel.sections.first?.id
    }

    private var feed: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: Theme.spacing.xl) {
                ForEach(indexedSections, id: \.element.id) { index, section in
                    DiscoverSectionView(section: section, namespace: namespace)
                        .onAppear {
                            prefetchImages(after: index)
                            
                            Task {
                                await viewModel.loadMoreIfNeeded(currentIndex: index)
                            }
                        }
                }
            }
            .padding(.vertical, Theme.spacing.md)
            .scrollTargetLayout()
        }
        .scrollPosition(id: $topSectionID, anchor: .top)
    }

    private var bottomBar: some View {
        ZStack(alignment: .trailing) {
            pagingStatus
                .frame(maxWidth: .infinity)

            if showsScrollToTop {
                scrollToTopButton
                    .transition(.scale.combined(with: .opacity))
            }
        }
        .frame(maxWidth: .infinity, alignment: .trailing)
        .animation(.spring(duration: 0.3), value: showsScrollToTop)
    }

    private var scrollToTopButton: some View {
        Button {
            withAnimation {
                topSectionID = viewModel.sections.first?.id
            }
        } label: {
            Image(systemName: "arrow.up")
                .fontWeight(.semibold)
                .imageScale(.large)
                .foregroundStyle(Theme.color(.textPrimary))
                .frame(width: 48, height: 48)
                .glassBackground()
        }
        .buttonStyle(.plain)
        .padding(Theme.spacing.md)
        .accessibilityLabel("Scroll to top")
    }

    private var skeleton: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Theme.spacing.xl) {
                ForEach(DiscoverSection.placeholders) { section in
                    DiscoverSectionView(section: section, namespace: namespace)
                }
            }
            .padding(.vertical, Theme.spacing.md)
        }
        .scrollDisabled(true)
        .allowsHitTesting(false)
        .redacted(reason: .placeholder)
        .shimmer()
        .accessibilityLabel("Loading")
    }

    private var indexedSections: [(offset: Int, element: DiscoverSection)] {
        Array(viewModel.sections.enumerated())
    }

    private func prefetchImages(after index: Int) {
        let upcoming = viewModel.sections.dropFirst(index + 1).prefix(2)
        let urls = upcoming.flatMap { $0.items.prefix(4).map(\.imageURL) }
        ImageLoader.shared.prefetch(urls)
    }

    @ViewBuilder
    private var pagingStatus: some View {
        if !viewModel.sections.isEmpty {
            switch viewModel.state {
            case .failed:
                retryButton
            case .loading:
                ProgressView()
                    .padding(Theme.spacing.sm)
                    .glassBackground()
            case .idle, .loaded:
                EmptyView()
            }
        }
    }

    private var retryButton: some View {
        Button("Try again") {
            Task {
                await viewModel.loadNextPage()
            }
        }
        .buttonStyle(.borderedProminent)
    }
}

#Preview("Loaded") {
    DiscoverScreen()
}

#Preview("Loading") {
    DiscoverScreen(repository: MockDiscoverRepository(latency: .seconds(3_600)))
}

#Preview("Failed") {
    DiscoverScreen(repository: FailingDiscoverRepository())
}

#Preview("Dark mode") {
    DiscoverScreen()
        .preferredColorScheme(.dark)
}

private struct FailingDiscoverRepository: DiscoverRepository {
    func page(_ index: Int) async throws -> DiscoverPage {
        throw URLError(.notConnectedToInternet)
    }
}
