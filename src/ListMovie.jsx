import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class ListMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      previousSearch: '',
      selectedMovie: null,
      isPopupOpen: false, 
    };
    this.fetchMovies = this.fetchMovies.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  fetchMovies(search) {
    const apiKey = 'd64465f835d027114fd469afd4e2de72';
    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
      
    axios.get(url)
      .then(response => {
        this.setState({
          movies: response.data.results,
          previousSearch: search,
        });
      })
      .catch(error => console.error('Error fetching movies:', error));
  }

  handlePropsChange() {
    const { search } = this.props;
    if (search !== this.state.previousSearch) {
      this.fetchMovies(search);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.handlePropsChange();
    }
  }

  componentDidMount() {
    this.fetchMovies('');
  }

  handleMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
      isPopupOpen: true,
    });
  }

  closePopup() {
    this.setState({
      isPopupOpen: false,
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie, isPopupOpen } = this.state;

    return (
      <div className="container">
        {movies.map(movie => (
          <div className="card" key={movie.id} onClick={() => this.handleMovieClick(movie)}>
            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <div>
              <h5>{movie.title}</h5>
              <p>{movie.overview.slice(0, 120)}</p>
            </div>
          </div>
        ))}

        {isPopupOpen && selectedMovie && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closePopup}>&times;</span>
              <img alt={selectedMovie.title} src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} className="modal-image" />
              <div className="modal-text">
                <h2>{selectedMovie.title}</h2>
                <p>{selectedMovie.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ListMovie.propTypes = {
  search: PropTypes.string,
};
