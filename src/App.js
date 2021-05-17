import './App.css';
import React, { useState, useEffect } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from 'spotify-web-api-js';

import Profile from "./Profile";
import Login from "./Login";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [profile, setProfile] = useState();
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();




  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    console.log(_token);

    if (_token) {
      setToken(_token);
      spotifyApi.setAccessToken(_token);

    }
    spotifyApi.getMe().then((value) => {
      setProfile(value);
    });
    spotifyApi.getMySavedAlbums().then((value) => {
      setAlbums(value.items);
    });

  }, []);

  console.log(token);
  console.log(albums)
  return (
    <div className="App">
      <h1>Digster</h1>
      {profile ? <h1><Profile profile={profile} /> </h1> :
        <Login />}
      <div className="albums"></div>
    </div>
  );
}

export default App;
