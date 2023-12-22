import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="home">
            <h1>Let's get started</h1>
            <div className="home-links">
                <Link to="/login">
                    <button className="general-button">
                        Login
                    </button>
                </Link>
                <div className="home-links-separator"></div>
                <Link to="/signup">
                    <button className="general-button">
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
}