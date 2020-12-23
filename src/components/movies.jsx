import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Movie from './movie';

class Movies extends Component {
  state = { 
    movies: getMovies()
  };

  showMessage=()=>{
    return this.state.movies.length>0?
    `Showing ${this.state.movies.length} movies in the database`:
    'There are no movies in database'
  }

  handleDelete=movie=>{
    const movies = this.state.movies.filter(m=>m._id!==movie._id)
    this.setState({movies})
  }
 
  

  render() { 
    const{length:count} = this.state.movies;
    if(!count) return <p>There are no movies in database</p>
    return ( 
      <>
    <p className='mt-3'>Showing {count} movies in databases</p>
    <table className="table">
      <thead>
        <tr>
        <th scope='col'>Title</th>
        <th scope='col'>Genre</th>
        <th scope='col'>Stock</th>
        <th scope='col'>Rate</th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.movies.map(movie=> 
        <Movie 
        id={movie._id}
        key={movie._id} 
        title={movie.title}
        genre={movie.genre.name}
        stock={movie.numberInStock}
        rate={movie.dailyRentalRate}
        onDelete={()=>this.handleDelete(movie)}
        />)}
      </tbody>
    </table>
    </>
     );
  }
}
 
export default Movies;