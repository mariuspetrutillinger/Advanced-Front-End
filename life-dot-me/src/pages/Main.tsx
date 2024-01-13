import React from "react";
import "./Main.scss";
import MainNav from "../components/MainNav.tsx";
import ArticleSection from "../components/ArticleSection.tsx";

export function Main() {

    return (
        <div className="main w-screen h-screen relative overflow-x-hidden">
            <MainNav />
            <div className="main-body flex flex-grow w-full h-full relative mt-36">
                <ArticleSection />
            </div>
        </div>
    );
}

export default Main;