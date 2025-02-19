//
//  ChurchDaysView.swift
//  donkey-assessment-ios
//
//  Created by Artsiom Charnetski on 15/02/2025.
//

import SwiftUI

struct ChurchDaysView: View {
    @StateObject private var viewModel = ChurchViewModel()
    
    var body: some View {
        NavigationStack {
            VStack {
                ChurchDaysList(viewModel: viewModel)
            }
            .navigationTitle("Church every day")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}
