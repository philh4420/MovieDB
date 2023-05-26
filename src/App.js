import React, { useState, useEffect } from 'react';
import Movie from '../src/Movie';
import './App.css';

const API_KEY = '66960d3b38e7771e0fbadad49521d15f';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_MOVIE_POPULAR_URL = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const API_TV_POPULAR_URL = `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const API_SEARCH_MOVIE_URL = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const API_SEARCH_TV_URL = `${API_BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=`;

function App() {
  const [mediaType, setMediaType] = useState('movie');
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPopularMedia();
  }, [mediaType]);

  const fetchPopularMedia = () => {
    const apiUrl = mediaType === 'movie' ? API_MOVIE_POPULAR_URL : API_TV_POPULAR_URL;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  };

  const handleSearchInput = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery === '') {
      fetchPopularMedia();
    } else {
      const searchUrl = mediaType === 'movie' ? API_SEARCH_MOVIE_URL : API_SEARCH_TV_URL;

      fetch(searchUrl + searchQuery)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.log(error));
    }
  };

  const handleMediaTypeToggle = () => {
    setMediaType(prevMediaType => (prevMediaType === 'movie' ? 'tv' : 'movie'));
    setSearchQuery('');
  };

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={`Search for a ${mediaType === 'movie' ? 'movie' : 'TV series'}...`}
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          Search
        </button>
        <button className="media-type-toggle" onClick={handleMediaTypeToggle}>
          {mediaType === 'movie' ? 'TV Series' : 'Movies'}
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
