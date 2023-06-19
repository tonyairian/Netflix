import React from "react";
import "./RowPost.css";
import { useState, useEffect } from "react";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/constants";
import YouTube from "react-youtube";
function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        // console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert("network error");
      });
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const playTrailer = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          console.log(response.data.results);
          setTrailerId(response.data.results[0]);
        } else {
          // setTrailerId("8j-BXCBeung");
          alert("Trailer not available");
        }
      })
      .catch((err) => {
        alert("Error 404");
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => {
          return (
            <img
              onClick={() => {
                playTrailer(obj.id);
              }}
              className={props.isSmall ? "smallPoster" : "poster"}
              alt="poster"
              src={`${imageUrl + obj.backdrop_path}`}
            />
          );
        })}
      </div>
      {trailerId && <YouTube opts={opts} videoId={trailerId.key} />}
    </div>
  );
}

export default RowPost;
