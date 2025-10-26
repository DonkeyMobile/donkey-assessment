package user.error

class AuthenticationFailed(): Throwable(
    message = "failed to find user matching credentials"
)