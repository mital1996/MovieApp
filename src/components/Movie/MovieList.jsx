/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import classes from "./MovieList.module.css";

const MovieList = ({ movie, onToggleFavorite, isFavorite }) => {
  const [isHover, setIsHover] = useState("");

  const handleToggleFavorite = () => {
    onToggleFavorite(movie);
  };

  return (
    <div
      className={`card ${classes.movieCard}`}
      onMouseEnter={() => setIsHover(movie.id)}
      onMouseLeave={() => setIsHover("")}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className={`card-img-top ${classes.movieImg}`}
      />

      <h5 className={`card-title ${classes.movieTitle}`}>
        {movie.original_title}
      </h5>

      <div
        className="button wrapper"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        {isHover === movie.id && (
          <a
            onClick={handleToggleFavorite}
            className={`btn btn-primary ${classes.movieButton}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieList;
