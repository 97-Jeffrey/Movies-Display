import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './pagination';
import paginate from '../utils/paginate';
import Like from './like';
import ListGroup from './listGroup';


class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    pageSize:4,
    currentPage:1
  };

  componentDidMount(){
    const genres =[{name: 'All genres'},...getGenres()]
    this.setState({movies: getMovies(), genres: genres })
  }


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
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre =>{
    this.setState({ selectedGenre: genre, currentPage:1 });
  }
  

  render() { 
    const{ length:count } = this.state.movies;
    const{ pageSize, currentPage, selectedGenre, movies:allMovies } = this.state;

    if(!count) return <p>There are no movies in database</p>

    const filtered = selectedGenre && selectedGenre._id? allMovies.filter(m=>m.genre._id=== selectedGenre._id) : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);


    return ( 
      <div className='row'>
        <div className="col-3">
          <ListGroup 
            items={this.state.genres} 
            onItemSelect={this.handleGenreSelect}
            selectedGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col">
        <p className='mt-3'>Showing {filtered.length} movies in the database</p>
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
        {movies.map(movie=> 
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
      itemsCount={filtered.length} 
      pageSize={pageSize} 
      currentPage={currentPage}
      onPageChange={this.handlePageChange}
    />
        </div>

    </div>
     );
  }
}
 
export default Movies;