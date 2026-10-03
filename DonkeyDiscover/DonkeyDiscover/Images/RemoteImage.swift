//
//  RemoteImage.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct RemoteImage: View {
    let url: URL
    var thumbnailURL: URL?
    var placeholder: ColorName = .placeholder
    var loader: ImageLoader = .shared

    @State private var phase: RemoteImagePhase
    @Environment(\.redactionReasons) private var redactionReasons

    init(
        url: URL,
        thumbnailURL: URL? = nil,
        placeholder: ColorName = .placeholder,
        loader: ImageLoader = .shared
    ) {
        self.url = url
        self.thumbnailURL = thumbnailURL
        self.placeholder = placeholder
        self.loader = loader
        let cached = loader.cachedImage(for: url) ?? thumbnailURL.flatMap(loader.cachedImage)
        _phase = State(initialValue: cached.map(RemoteImagePhase.loaded) ?? .loading)
    }

    var body: some View {
        RemoteImageContent(phase: phase, placeholder: placeholder)
            .task(id: redactionReasons.isEmpty ? url : nil) {
                guard redactionReasons.isEmpty else { return }
                if let cached = loader.cachedImage(for: url) {
                    phase = .loaded(cached)
                    return
                }
                if case .failed = phase {
                    phase = .loading
                }
                do {
                    let image = try await loader.image(for: url)
                    withAnimation(.easeOut(duration: 0.2)) {
                        phase = .loaded(image)
                    }
                } catch {
                    if !Task.isCancelled, case .loading = phase {
                        phase = .failed
                    }
                }
            }
    }
}

private enum RemoteImagePhase {
    case loading
    case loaded(UIImage)
    case failed
}

private struct RemoteImageContent: View {
    let phase: RemoteImagePhase
    var placeholder: ColorName = .placeholder

    @Environment(\.redactionReasons) private var redactionReasons

    var body: some View {
        Rectangle()
            .fill(Theme.color(placeholder))
            .overlay {
                switch phase {
                case .loading:
                    if redactionReasons.isEmpty {
                        ProgressView()
                    }
                case .loaded(let image):
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFill()
                        .transition(.opacity)
                case .failed:
                    Image(systemName: "photo")
                        .font(.title2)
                        .foregroundStyle(Theme.color(.textSecondary))
                }
            }
            .clipped()
            .accessibilityHidden(true)
    }
}

#Preview("Loaded") {
    RemoteImage(url: DiscoverItem.preview.imageURL)
        .frame(width: 240, height: 150)
}

#Preview("Loading") {
    RemoteImageContent(phase: .loading)
        .frame(width: 240, height: 150)
}

#Preview("Failed") {
    RemoteImageContent(phase: .failed)
        .frame(width: 240, height: 150)
}
