package com.egsdevelopment.donkeymobile.domain.authentication.error

class AuthenticationFailed(): Throwable(
    message = "failed to find user matching credentials"
)