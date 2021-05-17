import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from 'spotify-web-api-js';

import Profile from "./Profile";
import Login from "./Login";

const spotifyApi = new SpotifyWebApi();

// styling post container
const divStyle = {
  color: 'blue',
  height: '250px',
  textAlign: 'center',
  padding: '5px 10px',
  background: '#eee',
  marginTop: '15px'
};

const containerStyle = {
  maxWidth: '1280px',
  margin: '0 auto',
}

const albumss = {
  1: {
    id: 1,
    name: 'ABC'
  },
  3: {
    id: 3,
    name: 'DEF'
  }
}


function App() {
  const [profile, setProfile] = useState();
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();
  const [postList, setPostList] = useState({
    list: [1, 2, 3, 4]
  });
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
    const newList = postList.list.concat([page, 1, 1, 1]);
    setPostList({
      list: newList
    })
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

  console.log(token);

  console.log(albums);
  console.log(postList);
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
      <div className="container" style={containerStyle}>
        <div className="loading" ref={loader}>
          <h2>Load More</h2>
        </div>

        {/* <div className="post-list">
          {
            postList.list.map((post, index) => {
              return (<div key={index}
                className="post"
                style={divStyle}>
                <h2> {post} </h2>
              </div>)
            })
          }
          <div className="loading" ref={loader}>
            <h2>Load More</h2>
          </div>
        </div> */}
      </div>
    </div>

  );
}

export default App;
