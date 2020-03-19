import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const MoviesWillWatch = ({ moviesWillWatch }) => {

  const titles = moviesWillWatch.map(movie => {
    return (
      <ListGroupItem>
        <div className="d-flex justify-content-between">
          {movie.title} <span style={{ color: 'red' }}>{movie.vote_average}</span>
        </div>
      </ListGroupItem>
    )
  })

  return (
    <>
      <h4>
        Will Watch: {moviesWillWatch.length} {moviesWillWatch.length === 1 ? 'movie' : 'movies'}
      </h4>
      <ListGroup>
        {titles}
      </ListGroup>
    </>
  );
}


export default MoviesWillWatch;