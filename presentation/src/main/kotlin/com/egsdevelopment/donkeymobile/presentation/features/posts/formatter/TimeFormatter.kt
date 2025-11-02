package com.egsdevelopment.donkeymobile.presentation.features.posts.formatter

import java.time.DateTimeException
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import javax.inject.Inject

class TimeFormatter @Inject constructor() {

    companion object {
        const val DAY_MONTH_YEAR_HOUR_MINUTE_PATTERN = "dd MMM yyyy, HH:mm"
    }

    fun format(timeStamp: String, pattern: String): String? {
        return try {
            val formatter = getFormatter(pattern) ?: return null
            val offsetDateTime = parse(timeStamp) ?: return null
            offsetDateTime.format(formatter)
        } catch (exc: DateTimeException) {
            null
        }
    }

    private fun parse(timeStamp: String): OffsetDateTime? {
        return try {
            OffsetDateTime.parse(timeStamp)
        } catch (exc: DateTimeParseException) {
            null
        }
    }

    private fun getFormatter(pattern: String): DateTimeFormatter? {
        return try {
            DateTimeFormatter.ofPattern(pattern)
        } catch (exc: IllegalArgumentException) {
            null
        }
    }
}