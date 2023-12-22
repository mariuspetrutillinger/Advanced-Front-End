import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const handleSignup = () => {
        if (password === confirmPassword) {
            alert("Signup successful!");
        } else {
            alert("Signup failed!");
        }
    };

    return (
        <div className="signup">
            <h1>Sign-up</h1>
            <form>
                <input type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                />
                <input type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <input type="password" value={confirmPassword} 
                    onChange={(e) => setConfirm(e.target.value)} 
                    placeholder="Confirm Password" 
                />
                <button className="general-button" 
                    onClick={() => handleSignup()}>
                        Sign-up
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