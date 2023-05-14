// Movie.js

import React from 'react';
import '../src/App.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const Movie = ({ title, poster_path, overview, vote_average }) => (
  <div className="movie">
    <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} />
    <div className="movie-info">
      <h3>{title}</h3>
      <span className="rating">{vote_average}</span>
    </div>
    <div className="movie-overview">
      <h2>Overview:</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default Movie;
