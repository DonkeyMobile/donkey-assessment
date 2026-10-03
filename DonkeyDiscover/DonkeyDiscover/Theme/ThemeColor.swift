//
//  ThemeColor.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI

enum ColorName: String, CaseIterable {
    case accent = "AccentColor"
    case background
    case textPrimary
    case textSecondary
    case border
    case placeholder
    case highlight
    case scrim
    case textOnImage
    case splashBackground
    case splashSymbol

    static let `default`: ColorName = .textPrimary

    var color: Color {
        Color(rawValue)
    }
}
