//
//  ImageCache.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import UIKit

final class ImageCache {
    static let shared = ImageCache()
    private let cache = NSCache<NSString, UIImage>()
    private let queue = DispatchQueue(label: "com.donkey.imagecache")
    
    private init() {
        cacheConfiguration()
        setupMemoryWarningObserver()
    }
    
    private func cacheConfiguration() {
        cache.countLimit = 100
        cache.totalCostLimit = 1024 * 1024 * 100
    }
    
    private func setupMemoryWarningObserver() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(clearCache),
            name: UIApplication.didReceiveMemoryWarningNotification,
            object: nil
        )
    }
    
    @objc func clearCache() {
        queue.async {
            self.cache.removeAllObjects()
        }
    }
    
    func get(forKey key: String) -> UIImage? {
        guard !key.isEmpty else { return nil }
        return queue.sync {
            cache.object(forKey: key as NSString)
        }
    }
    
    func set(_ image: UIImage, forKey key: String) {
        guard !key.isEmpty else { return }
        queue.async {
            self.cache.setObject(image, forKey: key as NSString)
        }
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
