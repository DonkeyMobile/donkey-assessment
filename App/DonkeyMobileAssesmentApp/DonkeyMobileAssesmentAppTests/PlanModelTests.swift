//
//  PlanModelTests.swift
//  DonkeyMobileAssesmentAppTests
//
//  Created by Paul Tolnor on 15/10/2025.
//

import XCTest
@testable import DonkeyMobileAssesmentApp

final class PlanModelTests: XCTestCase {

    func testPlanInitializationSetsProperties() {
        let plan = Plan(title: "Walking in Faith",
                        planImageName: "post1",
                        description: "Discover how to trust God daily.")
        XCTAssertEqual(plan.title, "Walking in Faith")
        XCTAssertEqual(plan.planImageName, "post1")
        XCTAssertEqual(plan.description, "Discover how to trust God daily.")
    }

    func testPlansArrayExistsAndHasExpectedCount() {
        // Update expected count if you change the seed data
        XCTAssertEqual(plans.count, 5, "Expected 5 seed plans.")
    }

    func testPlanIDsAreUnique() {
        let ids = plans.map { $0.id }
        let unique = Set(ids)
        XCTAssertEqual(ids.count, unique.count, "All Plan IDs should be unique.")
    }

    func testPlanTitlesAreNonEmptyAfterTrimming() {
        XCTAssertFalse(
            plans.contains { $0.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "Plan titles should not be empty."
        )
    }

    func testPlanDescriptionsAreNonEmptyAfterTrimming() {
        XCTAssertFalse(
            plans.contains { $0.description.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "Plan descriptions should not be empty."
        )
    }

    func testPlanImageNamesAreNonEmpty() {
        XCTAssertFalse(
            plans.contains { $0.planImageName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty },
            "planImageName should not be empty."
        )
    }
}
