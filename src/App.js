import React, { useState } from 'react';

import MoviesList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = async () => {

    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://swapi.dev/api/films')
      
      if (!response.ok) {throw new Error('Something went wrong!')}
      
        const data = await response.json()
         const transformedMovies = data.results.map((movie) => {
              return {
                id: movie.episode_id,
                title: movie.title,
                openingText: movie.opening_crawl,
                releaseDate: movie.release_date
              }
          })
                setMovies(transformedMovies)
                setIsLoading(false)

    } catch (error) {
      setError(error.message)
    }

     setIsLoading(false)
  }
 
  let content = <h1>Found no Movies</h1>

  if(movies.length > 0) {content = <MoviesList movies={movies} />}

  if (error) {content = <h1>{error}</h1>}

  if (isLoading) {content = <h1>Loading....</h1>}

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </>
  );
}

export default App;
