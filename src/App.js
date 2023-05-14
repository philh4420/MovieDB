// App.js

import React, { useState, useEffect } from 'react';
import Movie from '../src/Movie';
import './App.css';

const API_KEY = '66960d3b38e7771e0fbadad49521d15f';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="movie-container">
      {movies.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default App;
