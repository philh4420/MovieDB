import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Movie from '../src/Movie';
import MediaModal from './MediaModal';
import './App.css';

const API_KEY = '66960d3b38e7771e0fbadad49521d15f';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_POPULAR_MOVIES_URL = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const API_POPULAR_TVSHOWS_URL = `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const API_SEARCH_URL = `${API_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleOpenModal = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  // Fetch popular movies and TV shows
  useEffect(() => {
    fetchPopularMovies();
    fetchPopularTVShows();
  }, []);

  const fetchPopularMovies = () => {
    fetch(API_POPULAR_MOVIES_URL)
      .then((response) => response.json())
      .then((data) =>
        setMovies((prevMovies) => ({ ...prevMovies, movies: data.results, searchType: '' }))
      )
      .catch((error) => console.log(error));
  };

  const fetchPopularTVShows = () => {
    fetch(API_POPULAR_TVSHOWS_URL)
      .then((response) => response.json())
      .then((data) =>
        setMovies((prevMovies) => ({ ...prevMovies, tvshows: data.results, searchType: '' }))
      )
      .catch((error) => console.log(error));
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery === '') {
      fetchPopularMovies();
      fetchPopularTVShows();
    } else {
      fetch(API_SEARCH_URL + searchQuery)
        .then((response) => response.json())
        .then((data) => {
          console.log('Search Results:', data.results);

          const searchResults = {
            movies: [],
            tvshows: [],
            searchType: 'search',
          };

          data.results.forEach((item) => {
            if (item.media_type === 'movie') {
              searchResults.movies.push(item);
            } else if (item.media_type === 'tv') {
              searchResults.tvshows.push(item);
            }
          });

          console.log('Formatted Search Results:', searchResults);

          setMovies(searchResults);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie or TV show..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {movies.searchType === '' && movies.movies && movies.movies.length > 0 && (
        <div>
          <h2 className="heading">Latest Movies</h2>
          <div className="movie-container">
            {movies.movies.map((movie) => (
              <Movie key={movie.id} {...movie} onClick={() => handleOpenModal(movie)} />
            ))}
          </div>
        </div>
      )}
      {movies.searchType === '' && movies.tvshows && movies.tvshows.length > 0 && (
        <div>
          <h2 className="heading">Latest TV Shows</h2>
          <div className="movie-container">
            {movies.tvshows.map((tvshow) => (
              <Movie
                key={tvshow.id}
                title={tvshow.name}
                {...tvshow}
                onClick={() => handleOpenModal(tvshow)}
              />
            ))}
          </div>
        </div>
      )}
      {movies.searchType === 'search' && (
        <div>
          <h2 className="heading">Search Results</h2>
          {movies.movies && movies.movies.length > 0 && (
            <div>
              <h3 className="heading">Movies</h3>
              <div className="movie-container">
                {movies.movies.map((movie) => (
                  <Movie key={movie.id} {...movie} onClick={() => handleOpenModal(movie)} />
                ))}
              </div>
            </div>
          )}
          {movies.tvshows && movies.tvshows.length > 0 && (
            <div>
              <h3 className="heading">TV Shows</h3>
              <div className="movie-container">
                {movies.tvshows.map((tvshow) => (
                  <Movie
                    key={tvshow.id}
                    title={tvshow.name}
                    {...tvshow}
                    onClick={() => handleOpenModal(tvshow)}
                  />
                ))}
              </div>
            </div>
          )}
          {movies.movies && movies.movies.length === 0 && movies.tvshows && movies.tvshows.length === 0 && (
            <p>No search results found.</p>
          )}
        </div>
      )}
      {selectedMedia && <MediaModal media={selectedMedia} onClose={handleCloseModal} />}
    </div>
  );
};

// Define prop types for the Movie component
Movie.propTypes = {
  vote_average: PropTypes.number.isRequired,
  // Add other prop types here...
};

export default App;
