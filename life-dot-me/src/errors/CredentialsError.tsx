class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "CredentialsError";
    }
}

export default CredentialsError;