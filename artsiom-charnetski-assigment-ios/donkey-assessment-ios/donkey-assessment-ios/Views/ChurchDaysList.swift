//
//  ChurchDaysList.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 17/02/2025.
//

import SwiftUI

struct ChurchDaysList: View {
    @ObservedObject var viewModel: ChurchViewModel
    
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 20, pinnedViews: [.sectionHeaders]) {
                ForEach(viewModel.loadedItems.indices, id: \.self) { index in
                    ChurchDaySection(sectionIndex: index, viewModel: viewModel)
                }
                if viewModel.isPaginating {
                    HStack {
                        Spacer()
                        ProgressView()
                            .padding()
                        Spacer()
                    }
                }
            }
        }
    }
}
