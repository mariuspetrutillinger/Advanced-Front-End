import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Alert from './Alert.tsx';
import { MainNavListItem } from "./MainNavListItem.tsx";

export function MainNav() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [searchInputValue, setSearchInputValue] = React.useState("");

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            <Alert message="So sad to see you go..." />
            await signOut(auth)
                .then(() => {
                    navigate("/login");
                });
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate(`/profile/${searchInputValue}`);
        }
    };

    return (
        <nav className="main-nav flex w-full h-16 justify-center">
            <ul className="flex w-1/2 h-full text-lg text-white text-center justify-evenly align-center rounded-full border-b border-primaryBlue">
                <MainNavListItem>
                    <img src={require("../assets/logo.png")} className="w-10 h-10" alt="Logo"/>
                </MainNavListItem>
                <MainNavListItem>
                    <Link to='/'>Home</Link>
                </MainNavListItem>
                <MainNavListItem>
                    <Link to="/profile">Profile</Link>
                </MainNavListItem>
                <MainNavListItem>
                    <button onClick={handleSignOut} className="cursor-none">Sign Out</button>
                </MainNavListItem>
                <MainNavListItem>
                    <form className="flex justify-center align-center">
                        <input type="text" placeholder="Search" className="rounded-full text-center"
                            value={searchInputValue}
                            onChange={(e) => setSearchInputValue(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </form>
                </MainNavListItem>
            </ul>
        </nav>
    );
}

export default MainNav;