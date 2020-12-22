import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieList extends Component {
  searchedMovies = () => {
    const searchedMovies = this.props.movies.map(({ title, id }) => {
      if (title) {
        return (
          <li key={id}>
            <Link to={`/movies/movie/${id}`}>{title}</Link>
          </li>
        );
      }
    });
    return searchedMovies;
  };

  render() {
    return (
      <div>
        <ul>{this.searchedMovies()}</ul>
      </div>
    );
  }
}

export default MovieList;
