//
//  ImageLoader.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

import UIKit

enum ImageLoaderError: Error {
    case badResponse
    case invalidData
}

actor ImageLoader {
    static let shared = ImageLoader()

    private let session: URLSession
    nonisolated(unsafe) private let memoryCache = NSCache<NSURL, UIImage>()
    private var inFlight: [URL: Task<UIImage, any Error>] = [:]

    init(session: URLSession = .images) {
        self.session = session
        memoryCache.totalCostLimit = 100 * 1_024 * 1_024
    }

    func image(for url: URL) async throws -> UIImage {
        if let cached = memoryCache.object(forKey: url as NSURL) {
            return cached
        }

        if let task = inFlight[url] {
            return try await task.value
        }

        let task = Task { try await load(url) }
        inFlight[url] = task
        defer { inFlight[url] = nil }
        return try await task.value
    }

    nonisolated func cachedImage(for url: URL) -> UIImage? {
        memoryCache.object(forKey: url as NSURL)
    }

    nonisolated func prefetch(_ urls: [URL]) {
        for url in urls {
            Task { _ = try? await image(for: url) }
        }
    }

    private func load(_ url: URL) async throws -> UIImage {
        let request = URLRequest(url: url)
        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse,
            (200..<300).contains(httpResponse.statusCode)
        else {
            throw ImageLoaderError.badResponse
        }
        guard let image = UIImage(data: data) else {
            throw ImageLoaderError.invalidData
        }

        session.configuration.urlCache?
            .storeCachedResponse(
                CachedURLResponse(response: response, data: data),
                for: request
            )

        let prepared = await image.byPreparingForDisplay() ?? image
        memoryCache.setObject(prepared, forKey: url as NSURL, cost: prepared.decodedByteCount)
        return prepared
    }
}

nonisolated private extension UIImage {
    var decodedByteCount: Int {
        Int(size.width * scale * size.height * scale * 4)
    }
}

nonisolated extension URLSession {
    static let images: URLSession = {
        let configuration = URLSessionConfiguration.default
        configuration.urlCache = URLCache(
            memoryCapacity: 20 * 1_024 * 1_024,
            diskCapacity: 200 * 1_024 * 1_024
        )
        configuration.requestCachePolicy = .returnCacheDataElseLoad
        configuration.timeoutIntervalForRequest = 15
        return URLSession(configuration: configuration)
    }()
}
