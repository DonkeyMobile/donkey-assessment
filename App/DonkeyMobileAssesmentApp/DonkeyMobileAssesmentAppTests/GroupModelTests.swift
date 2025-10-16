//
//  GroupModelTests.swift
//  DonkeyMobileAssesmentAppTests
//
//  Created by Paul Tolnor on 15/10/2025.
//

import XCTest
@testable import DonkeyMobileAssesmentApp

final class GroupModelTests: XCTestCase {

    func testGroupInitializationSetsProperties() {
        let group = Group(title: "Worship Team",
                          groupImageName: "post1",
                          description: "Lead the church in worship each week.")
        XCTAssertEqual(group.title, "Worship Team")
        XCTAssertEqual(group.groupImageName, "post1")
        XCTAssertEqual(group.description, "Lead the church in worship each week.")
    }

    func testGroupsArrayExistsAndHasExpectedCount() {
        // Update expected count if you change the seed data
        XCTAssertEqual(groups.count, 5, "Expected 5 seed groups.")
    }

    func testGroupTitlesAreNonEmptyAfterTrimming() {
        XCTAssertFalse(
            groups.contains { $0.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "Group titles should not be empty."
        )
    }

    func testGroupDescriptionsAreNonEmptyAfterTrimming() {
        XCTAssertFalse(
            groups.contains { $0.description.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "Group descriptions should not be empty."
        )
    }

    func testGroupImageNamesAreNonEmpty() {
        XCTAssertFalse(
            groups.contains { $0.groupImageName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "groupImageName should not be empty."
        )
    }
}
