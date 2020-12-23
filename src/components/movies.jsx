import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Pagination from './pagination';
import Like from './like';


class Movies extends Component {
  state = { 
    movies: getMovies(),
    pageSize:4
  };


  handleDelete=movie=>{
    const movies = this.state.movies.filter(m=>m._id!==movie._id)
    this.setState({movies})
  }

  handleLike=movie=>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index]={...movies[index]}
    movies[index].liked = !movies[index].liked;
    this.setState({movies})
  } 

  handlePageChange=page=>{

    console.lof(page)
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
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.movies.map(movie=> 
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/>
          </td>
          <td>
            <button
              onClick={()=>this.handleDelete(movie)}
              className="btn btn-danger btn-sm"
            >
            delete
            </button>
          </td>
        </tr>)}
      </tbody>
    </table>
    <Pagination 
      itemsCount={count} 
      pageSize={this.state.pageSize} 
      onPageChange={this.handlePageChange}
    />
    </>
     );
  }
}
 
export default Movies;