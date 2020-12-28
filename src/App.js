import React, { Component } from 'react';
import Movies from './components/movies';
import NavBar from './components/navBar';


class App extends Component {
  state = {  }
  render() { 
    return (
      <main className='container'>
       <NavBar/>
       <Movies/>
      </main>
     );
  }
}
 
export default App;