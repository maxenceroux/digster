import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from 'spotify-web-api-js';

import Profile from "./Profile";
import Login from "./Login";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [profile, setProfile] = useState();
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }

  }, []);
  useEffect(() => {
    // here we simulate adding new posts to List
    spotifyApi.getMySavedAlbums({ "offset": page * 20 }).then((value) => {
      const b = value.items.map(track => {
        return [{
          album: track.album
        }]
      })
      setAlbums(prevAlbums => {
        return [...new Set([...prevAlbums, ...value.items])]
      })
    });
  }, [page])

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

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

  return (
    <div className="App">
      <h1>Digster</h1>
      {profile ? <h1><Profile profile={profile} /> </h1> :
        <Login />}
      {albums ? <div>
        {Object.keys(albums).map((value, index) => {
          return <p> {albums[value]["album"]["name"]}</p>
        })
        }
      </div> : <div />
      }
      <div className="loading" ref={loader}>
        <h2>Load More</h2>
      </div>
    </div>

  );
}

export default App;
