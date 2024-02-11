import React from "react";
import MainNav from "../components/MainNav.tsx";
import ArticleSection from "../components/ArticleSection.tsx";
import CreateArticlePop from "../components/CreateaArticlePop.tsx";
import { GetProfileData, AddUserArticle } from "../backend/FirebaseDatabase.ts";
import { useState } from "react";

const Profile = () => {

    const uid = localStorage.getItem("uid");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [createArticle, setCreateArticle] = useState(false);

    const getProfile = async() => {
        if (uid) {
            try {
                const profile : any = await GetProfileData(uid);
                setEmail(profile.email);
                setUserName(profile.userName);
            } catch (error) {
                console.log(error);
                alert("Error fetching profile data");
            }
        }
    }

    getProfile();

    const handleAddArticle = () => {
        setCreateArticle(true);
    }

    const handleFormSubmit = async (title, content) => {
        if (title && content) {
            const date = new Date().toDateString();
            try {
                if (uid)
                    await AddUserArticle(uid, title, content, date);
            } catch (error) {
                console.log(error);
                alert("Error adding article");
            }
        }
        setCreateArticle(false);
    }

    return (
        <>
            <MainNav />
            <main className="flex flex-col w-1/2 h-auto absolute left-1/2 -translate-x-1/2 justify-center items-center overflow-x-hidden mt-10">
                <div className="flex flex-row w-1/2 h-auto items-center justify-between mb-12">
                    <h1 className="text-white text-3xl ">Profile</h1>
                    <div className="flex flex-row gap-4">
                        <div className="text-white text-md flex flex-col justify-center items-end">
                            <h2 className="text-md">{userName}</h2>
                            <h3 className="text-sm">{email}</h3>
                        </div>
                        <img src={require("../assets/user.png")} className="w-10 h-10 bg-white border rounded-full" alt="Profile" />
                    </div>
                </div>
                <ArticleSection main={false} profile={uid} />
                { createArticle ? <CreateArticlePop onSubmit={handleFormSubmit}/> :
                    <button onClick={handleAddArticle} className="w-auto pl-4 pr-4 h-10 bg-primaryBlue text-white rounded-full mb-10 cursor-none">Add Article</button>
                }
            </main>
        </>
    );
}

export default Profile;