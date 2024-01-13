import React from "react";
import './Alert.scss';

export function Alert({message}: {message: string}) {
    return (
        <div className="alert">
            <h3>{message}</h3>
        </div>
    );
}

export default Alert;