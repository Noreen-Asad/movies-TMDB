import React, { Component } from "react";
//import moviedb from '../../api/moviedb';
import axios from "axios";
import MovieList from "../MovieList/MovieList";
import SearchBar from "../SearchBar/SearchBar";
import MovieDetail from "../MovieDetail/MovieDetail";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  state = {
    movies: [],
  };
  onSearchSubmit = async (term) => {
    const response = await axios.all([
      axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=7aa8cd2b43b6de934c53ac4bf1fdac72",
        {
          params: { query: term },
        }
      ),
      axios.get(
        "https://api.themoviedb.org/3/search/tv?api_key=7aa8cd2b43b6de934c53ac4bf1fdac72",
        {
          params: { query: term },
        }
      ),
    ]);
    let moviesArray = response.map((res) => res.data.results);
    moviesArray = moviesArray.flat(); //es10 flat method rather than apply/concat/rest
    console.log(moviesArray);
    this.setState({ movies: moviesArray });
  };

  render() {
    return (
      <div>
        <Router>
          <div className="ui container" style={{ marginTop: "10px" }}>
            <Link to={"/movies"}>
              <SearchBar onSubmit={this.onSearchSubmit} />
            </Link>
            <Route exact path="/movies">
              <MovieList movies={this.state.movies} />
            </Route>
            <Route exact path="/movies/movie/:id">
              <MovieDetail />
            </Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
