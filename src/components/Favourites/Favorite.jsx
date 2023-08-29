import React, { useEffect, useState } from "react";

import FavoritePagination from "../../UI/FavoritePagination";
import classes from "./Favorite.module.css";

const genreids = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const Favorite = () => {
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageLimit, setPageLimit] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];
    const tempArr = [];

    movieData.forEach((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All Genres");
    setGenres(tempArr);
    setMovies(movieData);
  }, []);

  const handleGenreChange = (genres) => {
    setCurrGenre(genres);
  };

  let filterGenre = [];

  if (searchText === "") {
    filterGenre = movies;
  } else {
    filterGenre = movies.filter((movieObj) => {
      if (movieObj.original_title) {
        const title = movieObj.original_title.toLowerCase();
        return title.includes(searchText.toLowerCase());
      }
      return false;
    });
  }

  if (currGenre !== "All Genres") {
    filterGenre = movies.filter(
      (genre) => genreids[genre.genre_ids[0]] === currGenre
    );
  }

  const handleDescPopularity = () => {
    const tempArr = [...movies];
    tempArr.sort(
      (movieObj1, movieObj2) => movieObj2.popularity - movieObj1.popularity
    );

    setMovies(tempArr);
  };

  const handleAscPopularity = () => {
    const tempArr = [...movies];
    tempArr.sort(
      (movieObj1, movieObj2) => movieObj1.popularity - movieObj2.popularity
    );

    setMovies(tempArr);
  };

  const handleSortDescRating = () => {
    const tempArr = [...movies];
    tempArr.sort(
      (movieObj1, movieObj2) => movieObj2.vote_average - movieObj1.vote_average
    );

    setMovies(tempArr);
  };

  const handleSortAscRating = () => {
    const tempArr = [...movies];
    tempArr.sort(
      (movieObj1, movieObj2) => movieObj1.vote_average - movieObj2.vote_average
    );

    setMovies(tempArr);
  };

  const pages = Math.ceil(filterGenre.length / pageLimit);
  const pagesArr = [];

  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  const startIndex = (currPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;

  const displayedMovies = filterGenre.slice(startIndex, endIndex);

  filterGenre = displayedMovies;

  const onHandleChangePage = (page) => {
    setCurrPage(page);
  };

  const onHandleDeleteMovie = (id) => {
    let newMovieArr = [];

    newMovieArr = movies.filter((movie) => movie.id !== id);
    setMovies(newMovieArr);
    localStorage.setItem("movie", JSON.stringify(newMovieArr));
  };

  return (
    <>
      <div className="main">
        {filterGenre.length === 0 ? (
          <h3 className={classes.textCenter}>Add Your Favourite Movie!!</h3>
        ) : (
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul className="list-group" style={{ padding: "3rem" }}>
                {genres.map((genre) =>
                  currGenre === genre ? (
                    <li
                      className="list-group-item"
                      key={genre}
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item"
                      key={genre}
                      style={{ backgroundColor: "#fff", color: "#3f51b5" }}
                      onClick={() => handleGenreChange(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div
              className="col-lg-9 col-sm-12"
              style={{ padding: "3rem", overflow: "auto" }}
            >
              <div className="row">
                <input
                  type="text"
                  className="input-group-text col"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="Rows Limit"
                  value={pageLimit}
                  onChange={(e) => setPageLimit(e.target.value)}
                />
              </div>
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          className="fas fa-sort-up"
                          onClick={handleDescPopularity}
                        />
                        Popularity
                        <i
                          className="fas fa-sort-down"
                          onClick={handleAscPopularity}
                        ></i>
                      </th>
                      <th scope="col">
                        <i
                          className="fas fa-sort-up"
                          onClick={handleSortDescRating}
                        ></i>
                        Rating
                        <i
                          className="fas fa-sort-down"
                          onClick={handleSortAscRating}
                        ></i>
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterGenre.map((movieObj) => (
                      <tr key={movieObj.id}>
                        <td>
                          {
                            <>
                              <img
                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                alt={movieObj.original_title}
                                style={{ width: "5rem" }}
                              />
                              {movieObj.original_title}
                            </>
                          }
                        </td>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj && movieObj.popularity}</td>
                        <td>{movieObj && movieObj.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onHandleDeleteMovie(movieObj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <FavoritePagination
                pagesarr={pagesArr}
                handlePageChange={onHandleChangePage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorite;
