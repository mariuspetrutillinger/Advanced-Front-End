import { AuthError } from 'firebase/auth';

class AuthErrorHandler {
    private _errorMesage: string;

    constructor(error: AuthError) {
        this._errorMesage = this.handleError(error);
    }

    public get _errorMessage(): string {
        return this._errorMesage;
    }

    public handleError(error: AuthError): string {
        switch (error.code) {
            case "auth/email-already-in-use":
                return "Email already in use";
            case "auth/invalid-email":
                return "Invalid email";
            case "auth/weak-password":
                return "Password is too weak";
            case "auth/user-not-found":
                return "User not found";
            case "auth/wrong-password":
                return "Wrong password";
            default:
                return error.message;
        }
    }
}

export default AuthErrorHandler;