import React, { Component } from 'react';

class Movie extends Component {
  
  render() { 
    return ( 
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.genre}</td>
        <td>{this.props.stock}</td>
        <td>{this.props.rate}</td>
        <td><button className='btn btn-danger btn-sm' onClick={()=>this.props.onDelete()}>delete</button></td>
      </tr>
     );
  }
}
 
export default Movie;