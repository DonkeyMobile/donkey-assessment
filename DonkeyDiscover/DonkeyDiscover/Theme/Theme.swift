//
//  Theme.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

enum Theme {
    static let spacing = ThemeSpacing()
    static let radius = ThemeRadius()

    static func color(_ name: ColorName, opacity: Double = 1) -> Color {
        name.color.opacity(opacity)
    }
}

struct ThemeSpacing {
    let none: CGFloat = 0
    let xxs: CGFloat = 2
    let sm: CGFloat = 8
    let md: CGFloat = 16
    let lg: CGFloat = 24
    let xl: CGFloat = 32
}

struct ThemeRadius {
    let md: CGFloat = 12
    let lg: CGFloat = 20
    let xl: CGFloat = 28
}
