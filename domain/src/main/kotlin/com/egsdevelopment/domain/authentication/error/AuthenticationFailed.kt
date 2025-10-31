package com.egsdevelopment.domain.authentication.error

class AuthenticationFailed(): Throwable(
    message = "failed to find user matching credentials"
)