import React, { useState } from 'react';

import MoviesList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

  const fetchMoviesHandler = () => {
    fetch('https://swapi.dev/api/films')
      .then(response => response.json())
      .then(data => {
        const transformedMovies = data.results.map((movie) => {
            return {
              id: movie.episode_id,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date

            }
        })
              setMovies(transformedMovies)
      })
  }
 

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
}

export default App;
