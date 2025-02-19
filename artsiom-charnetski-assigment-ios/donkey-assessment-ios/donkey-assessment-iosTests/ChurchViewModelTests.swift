//
//  ChurchViewModelTests.swift
//  donkey-assessment-iosTests
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import XCTest
@testable import donkey_assessment_ios

final class ChurchViewModelTests: XCTestCase {
    var viewModel: ChurchViewModel!

    override func setUp() {
        super.setUp()
        viewModel = ChurchViewModel()
    }

    override func tearDown() {
        viewModel = nil
        super.tearDown()
    }

    func testLoadMoreData() {
        let initialCount = viewModel.loadedItems.count
        viewModel.loadMoreData()

        let expectation = self.expectation(description: "Wait for pagination to complete")
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            XCTAssertEqual(self.viewModel.loadedItems.count, initialCount + 10, "New batch of 10 sections should be added")
            XCTAssertFalse(self.viewModel.isPaginating, "isPaginating should be false after loading")
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 2.0)
    }

    func testNoDuplicatePagination() {
        let expectation = self.expectation(description: "Wait for pagination to complete")

        let initialBatch = viewModel.currentBatch

        viewModel.loadMoreData()
        viewModel.loadMoreData()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            XCTAssertEqual(self.viewModel.currentBatch, initialBatch + 1, "Pagination should only increment batch once per call cycle")
            XCTAssertFalse(self.viewModel.isPaginating, "isPaginating should be false after loading")
            expectation.fulfill()
        }

        wait(for: [expectation], timeout: 2.0)
    }

    func testPaginationStopsAtTotalSections() {
        let expectation = self.expectation(description: "Wait for all pagination to complete")
        
        func loadAllBatches(completion: @escaping () -> Void) {
            if self.viewModel.currentBatch * self.viewModel.batchSize < self.viewModel.totalSections {
                self.viewModel.loadMoreData()
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.1) {
                    loadAllBatches(completion: completion)
                }
            } else {
                completion()
            }
        }
        
        loadAllBatches {
            XCTAssertEqual(self.viewModel.loadedItems.count, self.viewModel.totalSections, "Items should not exceed totalSections")
            XCTAssertFalse(self.viewModel.isPaginating, "isPaginating should be false after full load")
            expectation.fulfill()
        }
        
        wait(for: [expectation], timeout: 15.0)
    }
}
