package com.egsdevelopment.domain.authentication.error

class Unauthenticated(): Throwable(
    message = "User is not authenticated"
)