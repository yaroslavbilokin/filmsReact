import React, { Component } from 'react';
import { Button, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import img from '../img/unnamed.jpg';

export default class MovieItem extends Component {

  state = {
    willWatch: false
  }
  
  render() {
    const { movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props;
    const { willWatch } = this.state;

    let imgSource;
    if (movie.backdrop_path || movie.poster_path) {
      imgSource = `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`;
    } else {
      imgSource = img;
    }

    return (
      <Card>
        <CardImg
          top
          src={imgSource}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{movie.title}</CardTitle>
          <CardText className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
            <Button
              color="outline-secondary"
              onClick={removeMovie.bind(this, movie)}
            >
              Delete movie
            </Button>
            {willWatch ? (
              <Button
                color="outline-danger"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  removeMovieFromWillWatch(movie)
                }}
              >
                Remove Will Watch
              </Button>
            ) : (
              <Button
                color= "outline-warning"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(movie)
                }}
              >
                Add Will Watch
              </Button>
            )}
          </CardText>
        </CardBody>
      </Card>
    );
  }
}