import React from "react";
import { LikeArticle } from "../backend/FirebaseDatabase.ts";

const Article = ({id, mostLiked, title, content}) => {
    const handleLike = async (id) => {
        console.log(id);
        try {
            await LikeArticle(id);
        } catch (error) {
            console.log(error);
        }
    };

    const div = document.getElementById(id);
    if (div) {
        div.addEventListener("dblclick", () => {
            handleLike(id);
        });
    }

    if (id !== mostLiked)
        return (
            <div id={id} className="flex w-1/2 h-64 flex-col relative justify-center bg-primaryDarkGrey border border-white">
                <h1 className="text-white absolute top-0 m-4 w-auto h-10 text-xl">{title}</h1>
                <p className="text-white absolute top-auto w-auto h-auto m-4">{content}</p>
            </div>
        );
    else
        return (
            <div id={id} className="flex w-1/2 h-64 flex-col relative justify-center bg-primaryDarkGrey border border-yellow-500">
                <h1 className="text-yellow-500 absolute top-0 m-4 w-auto h-10 text-xl">{title}</h1>
                <p className="text-yellow-500 absolute top-auto w-auto h-auto m-4">{content}</p>
            </div>
        );
};

export { Article };
