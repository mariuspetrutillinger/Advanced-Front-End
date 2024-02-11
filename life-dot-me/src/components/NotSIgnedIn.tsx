import React from "react";
import { useNavigate } from "react-router";

const NotSignedIn = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex w-1/2 h-64 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-primaryDarkGrey bordershadow">
            <h1 className="text-white w-auto h-auto text-xl">403</h1>
            <h2 className="text-white w-auto h-auto text-md">Not allowed</h2>
            <button onClick={handleGoBack} className="w-auto h-10 bg-primaryBlue text-white rounded-full cursor-none pl-4 pr-4 mt-4">Go back</button>
        </div>
    );
};

export default NotSignedIn;