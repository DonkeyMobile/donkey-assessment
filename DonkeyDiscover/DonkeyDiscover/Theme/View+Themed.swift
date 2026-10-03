//
//  View+Themed.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

extension View {
    func themed(
        _ typo: ThemeTypo,
        color: ColorName = .default
    ) -> some View {
        self
            .font(typo.font())
            .textCase(typo == .caps ? .uppercase : nil)
            .foregroundStyle(Theme.color(color))
    }

    @ViewBuilder
    func glassBackground() -> some View {
        if #available(iOS 26, *) {
            glassEffect()
        } else {
            background(.ultraThinMaterial, in: Capsule())
        }
    }

    func shimmer() -> some View {
        modifier(Shimmer())
    }

    @ViewBuilder
    func zoomSource(id: String, in namespace: Namespace.ID) -> some View {
        if #available(iOS 18, *) {
            matchedTransitionSource(id: id, in: namespace)
        } else {
            self
        }
    }

    @ViewBuilder
    func zoomTransition(from id: String, in namespace: Namespace.ID) -> some View {
        if #available(iOS 18, *) {
            navigationTransition(.zoom(sourceID: id, in: namespace))
        } else {
            self
        }
    }
}

private struct Shimmer: ViewModifier {
    private let period: Double = 2.1
    private let sweepShare: Double = 0.75

    func body(content: Content) -> some View {
        content
            .overlay {
                TimelineView(.animation) { timeline in
                    GeometryReader { proxy in
                        let time = timeline.date.timeIntervalSinceReferenceDate
                        let progress = time.truncatingRemainder(dividingBy: period) / period
                        let sweep = min(progress / sweepShare, 1)
                        let bandWidth = proxy.size.width * 0.6

                        LinearGradient(
                            colors: [.clear, Theme.color(.background, opacity: 0.5), .clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                        .frame(width: bandWidth)
                        .offset(x: -bandWidth + sweep * (proxy.size.width + bandWidth))
                    }
                }
                .mask(content)
                .allowsHitTesting(false)
            }
    }
}
