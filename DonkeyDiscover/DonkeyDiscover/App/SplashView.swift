//
//  SplashView.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

struct SplashView: View {
    let onFinish: () -> Void

    @State private var isShown = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        ZStack {
            Theme.color(.splashBackground)

            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Theme.color(.splashSymbol, opacity: 0.35),
                            Theme.color(.splashSymbol, opacity: 0),
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 160
                    )
                )
                .frame(width: 320, height: 320)
                .offset(y: -24)
                .opacity(isShown ? 1 : 0)

            StarShape()
                .fill(Theme.color(.splashSymbol))
                .frame(width: 96, height: 160)
                .scaleEffect(isShown || reduceMotion ? 1 : 0.6)
                .opacity(isShown ? 1 : 0)
        }
        .ignoresSafeArea()
        .accessibilityHidden(true)
        .task {
            withAnimation(.spring(duration: 0.7, bounce: 0.35)) {
                isShown = true
            }
            try? await Task.sleep(for: .seconds(1.2))
            onFinish()
        }
    }
}

nonisolated private struct StarShape: Shape {
    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.minY + rect.height * 0.352)
        let bendX = rect.width * 0.042
        let bendY = rect.height * 0.025

        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addQuadCurve(
            to: CGPoint(x: rect.maxX, y: center.y),
            control: CGPoint(x: center.x + bendX, y: center.y - bendY)
        )
        path.addQuadCurve(
            to: CGPoint(x: rect.midX, y: rect.maxY),
            control: CGPoint(x: center.x + bendX, y: center.y + bendY)
        )
        path.addQuadCurve(
            to: CGPoint(x: rect.minX, y: center.y),
            control: CGPoint(x: center.x - bendX, y: center.y + bendY)
        )
        path.addQuadCurve(
            to: CGPoint(x: rect.midX, y: rect.minY),
            control: CGPoint(x: center.x - bendX, y: center.y - bendY)
        )
        path.closeSubpath()
        return path
    }
}

#Preview("Light") {
    SplashView {}
}

#Preview("Dark mode") {
    SplashView {}
        .preferredColorScheme(.dark)
}
