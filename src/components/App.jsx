import React, { Component } from "react";
import MovieItem from "./movieItem";
import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import MoviesWillWatch from "./moviesWillWatch";
import { API_URL, API_KEY_3 } from '../utils/api';
import MovieTabs from "./MovieTabs";


export default class App extends Component {

  state = {
    movies: [],
    moviesWillWatch: [],
    sort_by: 'popularity.desc',
    page: 1,
    pages: ''
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevSate) {
    const { sort_by, page } = this.state;
    
    if (prevSate.sort_by !== sort_by ||
      prevSate.page !== page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    const { sort_by, page } = this.state;
    const type = '/discover/movie';

    fetch(`${API_URL}${type}?api_key=${API_KEY_3}&sort_by=${sort_by}&page=${page}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          movies: result.results,
          pages: result.total_pages
        });
      });
  }

  removeMovie = (movie) => {
    const { movies, moviesWillWatch } = this.state;
    const updateMovies = movies.filter(item => item.id !== movie.id);
    const updateMoviesWillWatch = moviesWillWatch.filter(item => item.id !== movie.id);

    this.setState({
      movies: updateMovies,
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  addMovieToWillWatch = movie => {
    const { moviesWillWatch } = this.state;
    let listWillWatch = [...moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: listWillWatch
    })
  }

  removeMovieFromWillWatch = movie => {
    const { moviesWillWatch } = this.state;
    const updateMoviesWillWatch = moviesWillWatch.filter(item => item.id !== movie.id);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  updateSortBy = category => {
    this.setState({
      sort_by: category
    })
  }

  moveToPrewPage = () => {
    console.log('page: ', this.state.page);
    if (this.state.page === 1) {
      return;
    } else {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  moveToNextPage = () => {
    console.log('page: ', this.state.page);

    this.setState({
      page: this.state.page + 1
    })
  }

  

  render() {

    const { movies, moviesWillWatch, sort_by, page, pages } = this.state;

    return (
      <Container className="mt-4">
        <Row>
          <MovieTabs
            sort_by={sort_by}
            updateSortBy={this.updateSortBy}
          />
          <Col sm="9">
            <Row>
              {movies.map(movie =>
                <Col md="6" className="mb-4" key={movie.id}>
                  <MovieItem
                    movie={movie}
                    removeMovie={this.removeMovie}
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                  />
                </Col>
              )}
            </Row>
          </Col>
          <Col sm="3">
            <MoviesWillWatch moviesWillWatch={moviesWillWatch}/>
          </Col>
        </Row>
        <Row className="ml-0">
          <ButtonGroup className="mb-4">
            <Button
              color="primary"
              outline
              onClick={this.moveToPrewPage}
            >
              Prew
            </Button>
            <Button
              color="primary"
              outline
              onClick={this.moveToNextPage}
            >
              Next
            </Button>
          </ButtonGroup>
          <div className="ml-4">Page Count: {page}/{pages}</div>
        </Row>
      </Container>
    );
  }
}