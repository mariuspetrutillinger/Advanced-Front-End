import React from "react";
import "./Main.scss";
import MainNav from "../components/MainNav.tsx";
import ArticleSection from "../components/ArticleSection.tsx";

const Main = () => {
    return (
        <div className="main w-screen absolute overflow-x-hidden">
            <MainNav />
            <div className="main-body flex flex-grow flex-col w-1/2 h-auto items-center absolute left-1/2 -translate-x-1/2 mt-24">
                <ArticleSection main={true} profile={null} />
            </div>
        </div>
    );
}

export default Main;