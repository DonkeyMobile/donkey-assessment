//
//  ImageCacheTests.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import XCTest
@testable import donkey_assessment_ios

final class ImageCacheTests: XCTestCase {
    var cache: ImageCache!
    var testImage: UIImage!

    override func setUp() {
        super.setUp()
        cache = ImageCache.shared
        testImage = UIImage(systemName: "star.fill")!
    }

    override func tearDown() {
        cache = nil
        testImage = nil
        super.tearDown()
    }

    func testStoreAndRetrieveImage() {
        let testKey = "testImageKey"

        cache.set(testImage, forKey: testKey)

        let retrievedImage = cache.get(forKey: testKey)
        XCTAssertNotNil(retrievedImage, "Retrieved image should not be nil")
        XCTAssertEqual(retrievedImage, testImage, "Retrieved image should be the same as stored image")
    }

    func testRetrieveNonExistentImage() {
        let retrievedImage = cache.get(forKey: "nonExistentKey")
        XCTAssertNil(retrievedImage, "Retrieving a non-existent image should return nil")
    }

    func testCacheRespectsCountLimit() {
        let cacheLimit = 100

        for i in 0..<(cacheLimit + 10) {
            cache.set(testImage, forKey: "key\(i)")
        }

        let retrievedImage = cache.get(forKey: "key\(cacheLimit + 5)")
        XCTAssertNotNil(retrievedImage, "Cache should still hold some recently added images")
    }
}
