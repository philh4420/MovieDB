import React, { useState, useEffect } from 'react';
import Movie from '../src/Movie';
import './App.css';

const API_KEY = '66960d3b38e7771e0fbadad49521d15f';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_POPULAR_URL = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const API_SEARCH_URL = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(API_POPULAR_URL)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  const handleSearchInput = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery === '') {
      fetch(API_POPULAR_URL)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.log(error));
    } else {
      fetch(API_SEARCH_URL + searchQuery)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>
      <div className="movie-container">
        {movies.map(movie => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
