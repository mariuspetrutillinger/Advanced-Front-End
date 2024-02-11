import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { MainNavListItem } from "./MainNavListItem.tsx";

const MainNav = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await signOut(auth);
            localStorage.setItem("isAllowed", "false");
            localStorage.removeItem("uid");
            navigate("/login");
        } catch (error) {
            alert("Signing out unsuccessful");
        }
    };

    return (
        <nav className="main-nav flex w-full h-16 justify-center">
            <ul className="flex w-1/2 h-full text-lg text-white text-center justify-evenly align-center rounded-full border-b border-primaryBlue">
                <MainNavListItem>
                    <img src={require("../assets/logo.png")} className="w-10 h-10" alt="Logo"/>
                </MainNavListItem>
                <MainNavListItem>
                    <Link to='/main'>Home</Link>
                </MainNavListItem>
                <MainNavListItem>
                    <Link to="/profile">Profile</Link>
                </MainNavListItem>
                <MainNavListItem>
                    <button onClick={handleSignOut} className="cursor-none">Sign Out</button>
                </MainNavListItem>
            </ul>
        </nav>
    );
};

export default MainNav;