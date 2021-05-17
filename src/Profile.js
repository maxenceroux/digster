import React from "react";

function Profile({ profile }) {
    return (
        <div className="profile">
            <div>{profile.display_name}</div>
            <img src={profile.images[0].url} />
        </div>
    );
}

export default Profile;