import React, { useState } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import CredentialsError from "../errors/CredentialsError.tsx";
import AuthErrorHandler from "../errors/AuthErrorHandler.tsx";

export function Signup() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async(e) => {
        e.preventDefault();

        try {
            if (password === confirmPassword) {
                setLoading(true);
                await createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigate("/login");
                    });
            }
            else {
                throw new CredentialsError("Passwords do not match");
            }
        } catch (error) {
            setLoading(false);
            console.log(error.code);
            console.log(error.message);

            if (error instanceof CredentialsError) {
                alert(error.message);
            } 

            const authErrorHandler = new AuthErrorHandler(error);
            alert(authErrorHandler._errorMessage);
        }
    };

    return (
        <div className="signup">
            <h1>Sign-up</h1>
            <form
                onSubmit={handleSignup}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirm(e.target.value)} 
                    placeholder="Confirm Password" 
                />
                <button className="general-button" 
                    type="submit">
                        {loading ? "Signing in..." : "Sign up"}
                </button>
            </form>
            <div className="signup-separator"></div>
            <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
