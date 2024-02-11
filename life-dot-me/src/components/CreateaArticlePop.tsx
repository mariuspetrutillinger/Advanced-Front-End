import React from "react";
import { useState } from "react";

const CreateArticlePop = ({onSubmit}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePost = async () => {
        console.log("Post article");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, content);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleClose = (e) => {
        e.preventDefault();
        onSubmit(null, null);
    };

    return (
        <div className="flex flex-col items-start justify-start relative w-2/3 h-5/6 z-10 bg-primaryDarkGrey border m-10">
            <h1 className="text-white mt-4 ml-6">New Article</h1>
            <button className="absolute top-4 right-4" onClick={handleClose}>
                <img src={require("../assets/close.png")} alt="Close" className="w-6 h-6 border rounded-full"/>
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start w-5/6 h-auto gap-7 mt-4 ml-6 mr-6 mb-4">
                <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" className="w-1/2"/>
                <textarea value={content} onChange={handleContentChange} placeholder="Content" className="w-full"/>
                <button type="submit" onClick={handlePost} className="w-auto pl-4 pr-4 h-10 bg-primaryBlue text-white rounded-full cursor-none">Post</button>
            </form>
        </div>
    );
}

export default CreateArticlePop;