import React from "react";
import classes from "./Card.module.css";

const Card = ({ movie }) => {
  return (
    <div className={`card ${classes.bannerCard}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className={`card-img-top ${classes.bannerImg}`}
      />
      <div className="card-body">
        <h5 className={`card-title ${classes.bannerTitle}`}>
          {movie.original_title}
        </h5>
        <p className={`card-text ${classes.bannerText}`}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Card;
