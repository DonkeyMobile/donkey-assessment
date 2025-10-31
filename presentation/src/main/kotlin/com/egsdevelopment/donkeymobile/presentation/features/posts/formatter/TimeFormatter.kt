package com.egsdevelopment.donkeymobile.presentation.features.posts.formatter

import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import javax.inject.Inject

class TimeFormatter @Inject constructor() {

    private companion object {
        const val PATTERN = "dd MMM yyyy, HH:mm"
    }

    fun format(timeStamp: String): String {
        val odt = OffsetDateTime.parse(timeStamp)
        val formatter = DateTimeFormatter.ofPattern(PATTERN)
        return odt.format(formatter)
    }
}