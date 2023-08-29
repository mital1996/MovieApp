import React, { useState, useEffect } from "react";

import MovieList from "./MovieList";
import Pagination from "../../UI/Pagination";

const Movie = () => {
  const [pages, setPages] = useState([1]);
  const [isCurrPage, setIsCurrPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=d298c2f8a69adb09ede30e0112c1fbe1&page=${isCurrPage}`
      );

      const data = await response.json();
      //console.log("data>>>>>>", data);
      setMovies(data.results);
    };
    getMovies();
  }, [isCurrPage]);

  const changeMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=d298c2f8a69adb09ede30e0112c1fbe1&page=${isCurrPage}`
    );

    const data = await response.json();
    setMovies(data.results);
  };

  const onHandleRightPage = async () => {
    let temparr = [];
    for (let i = 1; i <= pages.length + 1; i++) {
      temparr.push(i);
    }
    setPages(temparr);
    setIsCurrPage(isCurrPage + 1);
    changeMovies();
  };

  const onHandleLeftPage = () => {
    if (isCurrPage !== 1) {
      setIsCurrPage(isCurrPage - 1);
      changeMovies();
    }
  };

  const onHandleMiddlePages = (value) => {
    if (value !== isCurrPage) {
      setIsCurrPage(value);
      changeMovies();
    }
  };

  const handleToggleFavorite = (movie) => {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];

    const existingIndex = movieData.findIndex(
      (movieObj) => movieObj.id === movie.id
    );

    if (existingIndex !== -1) {
      movieData.splice(existingIndex, 1);
    } else {
      movieData.push(movie);
    }

    //console.log("oldData>>>>>>", movieData);
    localStorage.setItem("movie", JSON.stringify(movieData));

    HandleFavouriteMovieState();
  };

  const HandleFavouriteMovieState = () => {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];

    const tempArr = movieData.map((movie) => movie.id);

    setFavorites(tempArr);
  };

  return (
    <div>
      {movies.length === 0 ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h3 className="text-center">
            <strong>Trending</strong>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "1rem",
              justifyContent: "center",
            }}
          >
            {Array.isArray(movies) &&
              movies.map((movieObj) => (
                <div key={movieObj.id}>
                  <MovieList
                    movie={movieObj}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(movieObj.id)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          handleRight={onHandleRightPage}
          pages={pages}
          handleLeft={onHandleLeftPage}
          handleMiddlePage={onHandleMiddlePages}
        />
      </div>
    </div>
  );
};

export default Movie;
