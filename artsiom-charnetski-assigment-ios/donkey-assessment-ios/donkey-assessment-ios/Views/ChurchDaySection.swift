//
//  ChurchDaySection.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI

struct ChurchDaySection: View {
    let sectionIndex: Int
    @ObservedObject var viewModel: ChurchViewModel
    
    var body: some View {
        Section(header: ChurchDaySectionHeader(title: "Day \(sectionIndex + 1)")) {
            ScrollView(.horizontal, showsIndicators: false) {
                LazyHStack(spacing: 15) {
                    ForEach(viewModel.loadedItems[sectionIndex]) { item in
                        ChurchDayCardView(item: item)
                    }
                }
                .padding(.horizontal)
            }
        }
        .onAppear {
            if sectionIndex == viewModel.loadedItems.count - 1 {
                viewModel.loadMoreData()
            }
        }
    }
}
