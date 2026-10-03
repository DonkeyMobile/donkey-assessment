//
//  DonkeyDiscoverApp.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI
import UIKit

@main
struct DonkeyDiscoverApp: App {
    @State private var showsSplash = true

    init() {
        let textColor = UIColor(named: ColorName.textPrimary.rawValue) ?? .label
        let appearance = UINavigationBar.appearance()

        appearance.largeTitleTextAttributes = [
            .font: ThemeTypo.largeTitle.uiFont(),
            .foregroundColor: textColor,
        ]

        appearance.titleTextAttributes = [
            .font: ThemeTypo.titleSmall.uiFont(),
            .foregroundColor: textColor,
        ]
    }

    var body: some Scene {
        WindowGroup {
            ZStack {
                DiscoverScreen()

                if showsSplash {
                    SplashView {
                        withAnimation(.easeInOut(duration: 0.5)) {
                            showsSplash = false
                        }
                    }
                    .transition(.opacity.combined(with: .scale(scale: 1.15)))
                    .zIndex(1)
                }
            }
            .statusBarHidden()
        }
    }
}
