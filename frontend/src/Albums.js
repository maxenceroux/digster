import React from "react";
import "./Albums.css";
function Albums({ albums }) {
  return (
    <div className="albums">
      {Object.keys(albums).map((value, index) => {
        return (
          <div className="albums-card">
            <img src={albums[value]["album"]["images"][0]["url"]} />
            <p> {albums[value]["album"]["name"]}</p>
            <p> {albums[value]["album"]["artists"][0]["name"]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Albums;
