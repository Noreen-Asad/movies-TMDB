import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      error: false,
    };
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      return;
    }
    // I hate this this.props.match.params.id
    // Need to find best practice of doing it.
    // We get location props by wrapping this component in withRouter line 50
    const url = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=7aa8cd2b43b6de934c53ac4bf1fdac72`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movie: data,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  }

  renderItems() {
    if (!this.state.error) {
      return <div>{this.state.movie.overview}</div>;
    } else {
      return <div>Details can't be found at this moment.</div>;
    }
  }

  render() {
    return <div>{this.renderItems()}</div>;
  }
}

export default withRouter(MovieDetail);
