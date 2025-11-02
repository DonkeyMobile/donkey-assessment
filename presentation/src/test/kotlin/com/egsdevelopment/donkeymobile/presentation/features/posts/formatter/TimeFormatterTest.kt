package com.egsdevelopment.donkeymobile.presentation.features.posts.formatter

import org.junit.Assert
import kotlin.test.Test

class TimeFormatterTest {

    @Test
    fun `when timestamp is not parsable return null`() {
        // Given
        val pattern = TimeFormatter.DAY_MONTH_YEAR_HOUR_MINUTE_PATTERN
        val timeStamp = "niet_werkende_timestamp"
        val timeFormatter = TimeFormatter()
        // When
        val result = timeFormatter.format(timeStamp, pattern)
        // Then
        Assert.assertEquals(null, result)
    }

    @Test
    fun `when pattern is not valid return null`() {
        // Given
        val pattern = "not_valid_pattern"
        val timeStamp = "2024-11-10T09:00:00Z"
        val timeFormatter = TimeFormatter()
        // When
        val result = timeFormatter.format(timeStamp, pattern)
        // Then
        Assert.assertEquals(null, result)
    }
}