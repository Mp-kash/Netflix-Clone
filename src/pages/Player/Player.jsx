import React, { useEffect, useState } from "react";
import "./player.css";
import { useNavigate, useParams } from "react-router-dom";
// import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTIzYTgwNTg1ZTg5MzA5Nzk5MTU4NjE4ZTRkMzYyNSIsIm5iZiI6MTc0MzAxMDg2NS44MDksInN1YiI6IjY3ZTQzYzMxN2RiOWU3MGM0N2RjYjYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgJOwk09L5oy64_acp3um5wgORqRl-_59sKjy4QMrhc",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <i
        className="fa-solid fa-circle-arrow-left"
        onClick={() => {
          navigate(-2);
        }}
      ></i>
      {/* <img src={back_arrow_icon} alt="" /> */}
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameborder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
