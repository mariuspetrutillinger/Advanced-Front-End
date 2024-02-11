import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import AuthErrorHandler from '../errors/AuthErrorHandler.tsx';
import Alert from './Alert.tsx';

export function Login() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleRemember = () => {
        setRemember(!isRemembered);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            await setPersistence(auth, isRemembered ? browserLocalPersistence : browserSessionPersistence);
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("isAllowed", "true");
            const authenticatedUser = userCredentials.user;

            if (authenticatedUser) {
                localStorage.setItem("uid", authenticatedUser.uid);
                navigate("/main");
            }

        } catch (error) {
            setLoading(false);
            alert("Username or password is incorrect. Try again.")
            console.log(new AuthErrorHandler(error)._errorMessage);
        }
        
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
                localStorage.setItem("isAllowed", "true");
                localStorage.setItem("uid", user.uid);
                setTimeout(() => {
                    navigate("/main");
                }, 2000);
            }

        });

        return () => unsubscribe();
    });

    return (
        <div>
            {loggedIn ? <Alert message="Hi, we already know each other..." /> : null}
            <div className="login"
                style={
                    loggedIn ? {filter: 'blur(10px)'} : {filter: 'none'}
                }>
                <h1>Login</h1>
                <form
                    onSubmit={handleLogin}>
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
                    <div>
                        Remember me?{" "}
                        <input 
                            type="checkbox" 
                            checked={isRemembered} 
                            onChange={handleRemember}
                        />
                    </div>
                    <button className="general-button cursor-none" 
                        type="submit">
                            {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <div className="login-separator"></div>
                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;