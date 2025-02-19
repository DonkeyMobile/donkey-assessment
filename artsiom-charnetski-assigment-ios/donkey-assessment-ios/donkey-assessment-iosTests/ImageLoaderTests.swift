//
//  ImageLoaderTests.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import XCTest
import Combine
import SwiftUI
@testable import donkey_assessment_ios

final class ImageLoaderTests: XCTestCase {
    var imageLoader: ImageLoader!
    var cancellables: Set<AnyCancellable>!
    var validURL: String!
    var invalidURL: String!

    override func setUp() {
        super.setUp()
        imageLoader = ImageLoader()
        cancellables = []
        validURL = "https://picsum.photos/id/237/200/300"
        invalidURL = "invalid_url"
    }

    override func tearDown() {
        imageLoader = nil
        cancellables = nil
        validURL = nil
        invalidURL = nil
        super.tearDown()
    }

    func testLoadImageFromNetwork() {
        let expectation = self.expectation(description: "Image should load successfully")

        imageLoader.$image
            .dropFirst()
            .sink { image in
                if image != nil {
                    expectation.fulfill()
                }
            }
            .store(in: &cancellables)

        imageLoader.loadImage(url: validURL)

        wait(for: [expectation], timeout: 5.0)
        XCTAssertNotNil(imageLoader.image, "Image should be loaded")
        XCTAssertFalse(imageLoader.isLoading, "isLoading should be false after loading")
        XCTAssertNil(imageLoader.error, "Error should be nil on successful load")
    }

    func testLoadImageFromCache() {
        let testImage = UIImage(systemName: "star.fill")!

        ImageCache.shared.set(testImage, forKey: validURL)

        imageLoader.loadImage(url: validURL)

        XCTAssertNotNil(imageLoader.image, "Image should be retrieved from cache")
        XCTAssertEqual(imageLoader.image, testImage, "Loaded image should match cached image")
        XCTAssertFalse(imageLoader.isLoading, "isLoading should be false after loading")
        XCTAssertNil(imageLoader.error, "Error should be nil")
    }

    func testLoadImageWithInvalidURL() {
        let expectation = self.expectation(description: "Error should be set for invalid URL")

        imageLoader.$error
            .dropFirst()
            .sink { error in
                if error != nil {
                    expectation.fulfill()
                }
            }
            .store(in: &cancellables)

        imageLoader.loadImage(url: invalidURL)

        wait(for: [expectation], timeout: 2.0)
        XCTAssertNotNil(imageLoader.error, "Error should be set")
        XCTAssertNil(imageLoader.image, "Image should be nil on failure")
        XCTAssertFalse(imageLoader.isLoading, "isLoading should be false after failure")
    }

    func testIsLoadingState() {
        let loadingStartExpectation = expectation(description: "Loading should start")
            let loadingEndExpectation = expectation(description: "Loading should end")
            var didObserveLoadingState = false

        imageLoader.$isLoading
            .dropFirst()
            .sink { isLoading in
                if isLoading && !didObserveLoadingState {
                    didObserveLoadingState = true
                    loadingStartExpectation.fulfill()
                } else if !isLoading && didObserveLoadingState {
                    loadingEndExpectation.fulfill()
                }
            }
            .store(in: &cancellables)

        imageLoader.loadImage(url: validURL)

        wait(for: [loadingStartExpectation, loadingEndExpectation], timeout: 5.0)
    }
}
