//
//  ChurchViewModel.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI

final class ChurchViewModel: ObservableObject {
    @Published private(set) var loadedItems: [[ChurchDayItem]] = []
    private var allItems: [[ChurchDayItem]] = []
    
    let totalSections = 100
    let itemsPerSection = 7
    let batchSize = 10
    private(set) var currentBatch = 0

    @Published private(set) var isLoading = true
    @Published private(set) var isPaginating = false

    init() {
        generateMockData()
        loadMoreData()
    }

    private func generateMockData() {
        for sectionIndex in 0..<totalSections {
            let sectionItems = (0..<itemsPerSection).map { itemIndex in
                ChurchDayItem(
                    imageURL: "https://picsum.photos/id/\(itemIndex + (10 * sectionIndex))/200/300",
                    title: "Church event at \(10 + itemIndex):00",
                    description: "Welcome to the church!"
                )
            }
            allItems.append(sectionItems)
        }
    }

    func loadMoreData() {
        guard currentBatch * batchSize < totalSections, !isPaginating else { return }

        isPaginating = true

        let nextBatchEnd = min((currentBatch + 1) * batchSize, totalSections)
        let newSections = allItems[currentBatch * batchSize..<nextBatchEnd]

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.loadedItems.append(contentsOf: newSections)
            self.currentBatch += 1
            self.isPaginating = false
            self.isLoading = false
        }
    }
}
