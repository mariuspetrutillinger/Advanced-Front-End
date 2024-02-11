import React, { useState } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import CredentialsError from "../errors/CredentialsError.tsx";
import AuthErrorHandler from "../errors/AuthErrorHandler.tsx";
import { AddNewUser } from "../backend/FirebaseDatabase.ts";

export function Signup() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async(e) => {
        e.preventDefault();
        auth.signOut();
        localStorage.setItem("isAllowed", "false");

        try {
            if (password === confirmPassword) {
                setLoading(true);
                const newUserCredentials = await createUserWithEmailAndPassword(auth, email, password)
                const newUser = newUserCredentials.user;

                if (newUser) {
                    console.log(newUser);
                    await AddNewUser(newUser.uid, email, password);

                }

                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 2000);
            }
            else {
                throw new CredentialsError("Passwords do not match");
            }
        } catch (error) {
            setLoading(false);

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
                <button className="general-button cursor-none" 
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
