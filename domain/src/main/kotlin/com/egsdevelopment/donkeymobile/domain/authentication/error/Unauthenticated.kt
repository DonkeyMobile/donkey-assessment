package com.egsdevelopment.donkeymobile.domain.authentication.error

class Unauthenticated(): Throwable(
    message = "User is not authenticated"
)