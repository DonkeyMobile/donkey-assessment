//
//  ImageLoader.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI
import Combine

final class ImageLoader: ObservableObject {
    @Published var image: UIImage?
    @Published var isLoading = false
    @Published var error: Error?

    private var url: String?
    private var cancellable: AnyCancellable?

    func loadImage(url: String) {
        guard let imageUrl = URL(string: url)
        else {
            self.error = URLError(.badURL)
            return
        }

        if let cachedImage = ImageCache.shared.get(forKey: url) {
            self.image = cachedImage
            return
        }

        isLoading = true
        error = nil

        cancellable = URLSession.shared.dataTaskPublisher(for: imageUrl)
            .retry(2)
            .map { data, response -> UIImage? in
                return UIImage(data: data)
            }
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { [weak self] completion in
                guard let self = self else { return }
                self.isLoading = false
                
                if case .failure(let error) = completion {
                    self.error = error
                }
            }, receiveValue: { [weak self] image in
                guard let self = self,
                      let image = image
                else { return }
                ImageCache.shared.set(image, forKey: url)
                self.image = image
            })
    }
    
    deinit {
        cancellable?.cancel()
    }
}
