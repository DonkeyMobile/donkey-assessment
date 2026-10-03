//
//  ThemeTypo.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import SwiftUI
import UIKit

enum ThemeFont: String, CaseIterable {
    case displayBold = "ClashGrotesk-700"
    case displayMedium = "ClashGrotesk-500"
    case bodyBold = "Satoshi-700"
    case bodyRegular = "Satoshi-400"
}

enum ThemeTypo {
    case largeTitle
    case titleLarge
    case headline
    case title
    case titleSmall
    case body
    case bodySmall
    case caps

    var fontSize: CGFloat {
        switch self {
        case .largeTitle: 34
        case .titleLarge: 28
        case .headline: 22
        case .title: 19
        case .titleSmall: 16
        case .body: 17
        case .bodySmall: 13
        case .caps: 11
        }
    }

    var face: ThemeFont {
        switch self {
        case .largeTitle, .titleLarge, .headline: .displayBold
        case .title, .titleSmall: .displayMedium
        case .caps: .bodyBold
        case .body, .bodySmall: .bodyRegular
        }
    }

    var textStyle: Font.TextStyle {
        switch self {
        case .largeTitle: .largeTitle
        case .titleLarge: .title
        case .headline: .title2
        case .title: .title3
        case .titleSmall: .headline
        case .body: .body
        case .bodySmall: .subheadline
        case .caps: .caption
        }
    }

    func font() -> Font {
        Font.custom(
            face.rawValue,
            size: fontSize,
            relativeTo: textStyle
        )
    }

    func uiFont() -> UIFont {
        let base = UIFont(name: face.rawValue, size: fontSize) ?? .systemFont(ofSize: fontSize)
        return UIFontMetrics.default.scaledFont(for: base)
    }
}
