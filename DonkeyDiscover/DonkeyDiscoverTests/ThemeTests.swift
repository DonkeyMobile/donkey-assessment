//
//  ThemeTests.swift
//  DonkeyDiscoverTests
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Testing
import UIKit

@testable import DonkeyDiscover

struct ThemeTests {
    @Test(arguments: ColorName.allCases)
    func colorExistsInAssetCatalog(_ name: ColorName) {
        #expect(UIColor(named: name.rawValue) != nil)
    }

    @Test(arguments: ThemeFont.allCases)
    func fontIsRegistered(_ font: ThemeFont) {
        #expect(UIFont(name: font.rawValue, size: 12) != nil)
    }
}
