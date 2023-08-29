import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";

const Header = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=d298c2f8a69adb09ede30e0112c1fbe1&pages=1`
      );

      const data = await response.json();
      const firstMovie = data.results[0];
      setMovie(firstMovie);
    };
    getMovie();
  }, []);

  return (
    <>
      {movie ? (
        <Card movie={movie} />
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};

export default Header;
