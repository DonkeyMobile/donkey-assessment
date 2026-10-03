//
//  ImageLoaderTests.swift
//  DonkeyDiscoverTests
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import Foundation
import Testing
import UIKit

@testable import DonkeyDiscover

@Suite(.serialized)
struct ImageLoaderTests {
    private let url = URL(filePath: "/image.png")

    @Test
    func secondRequestComesFromMemory() async throws {
        let loader = makeLoader(statusCode: 200, data: Self.pngData)

        _ = try await loader.image(for: url)
        _ = try await loader.image(for: url)

        #expect(StubURLProtocol.requestCount == 1)
    }

    @Test
    func loadedImageIsAvailableWithoutWaiting() async throws {
        let loader = makeLoader(statusCode: 200, data: Self.pngData)
        #expect(loader.cachedImage(for: url) == nil)

        _ = try await loader.image(for: url)

        #expect(loader.cachedImage(for: url) != nil)
    }

    @Test
    func concurrentRequestsShareOneDownload() async throws {
        let loader = makeLoader(statusCode: 200, data: Self.pngData)
        let gate = DispatchSemaphore(value: 0)
        StubURLProtocol.gate = gate

        let first = Task { try await loader.image(for: url) }
        while StubURLProtocol.requestCount == 0 {
            try await Task.sleep(for: .milliseconds(1))
        }
        let second = Task { try await loader.image(for: url) }
        try await Task.sleep(for: .milliseconds(50))
        gate.signal()

        let images = try await (first.value, second.value)

        #expect(StubURLProtocol.requestCount == 1)
        #expect(images.0 === images.1)
    }

    @Test
    func serverErrorThrows() async {
        let loader = makeLoader(statusCode: 500, data: Self.pngData)

        await #expect(throws: ImageLoaderError.badResponse) {
            try await loader.image(for: url)
        }
    }

    @Test
    func invalidDataThrows() async {
        let loader = makeLoader(statusCode: 200, data: Data("not an image".utf8))

        await #expect(throws: ImageLoaderError.invalidData) {
            try await loader.image(for: url)
        }
    }

    private func makeLoader(statusCode: Int, data: Data) -> ImageLoader {
        StubURLProtocol.reset(statusCode: statusCode, data: data)

        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [StubURLProtocol.self]
        return ImageLoader(session: URLSession(configuration: configuration))
    }

    private static let pngData = UIGraphicsImageRenderer(size: CGSize(width: 2, height: 2))
        .pngData { context in
            context.fill(CGRect(x: 0, y: 0, width: 2, height: 2))
        }
}

nonisolated private final class StubURLProtocol: URLProtocol, @unchecked Sendable {
    nonisolated(unsafe) static var statusCode = 200
    nonisolated(unsafe) static var data = Data()
    nonisolated(unsafe) static var requestCount = 0
    nonisolated(unsafe) static var gate: DispatchSemaphore?

    static func reset(statusCode: Int, data: Data) {
        self.statusCode = statusCode
        self.data = data
        requestCount = 0
        gate = nil
    }

    override static func canInit(with request: URLRequest) -> Bool {
        true
    }

    override static func canonicalRequest(for request: URLRequest) -> URLRequest {
        request
    }

    override func startLoading() {
        Self.requestCount += 1
        Self.gate?.wait()
        guard let url = request.url,
            let response = HTTPURLResponse(
                url: url,
                statusCode: Self.statusCode,
                httpVersion: nil,
                headerFields: nil
            )
        else {
            client?.urlProtocol(self, didFailWithError: URLError(.badURL))
            return
        }

        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: Self.data)
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}
