import React from "react";

function Profile(user) {
    return (
        <div className="flex flex-col justify-center align-center">
            <h1>Profile</h1>
            <img src={user.photoURL} alt="Profile" />
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
        </div>
    );
}

export default Profile;