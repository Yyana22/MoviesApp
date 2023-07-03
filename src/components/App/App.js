import React, { Component } from 'react';
import './App.css';

import MovieServices from '../../service/Services';
import List from '../List/index';

export default class App extends Component {
  movieServices = new MovieServices();
  state = {
    obj: null,
    genre: [],
  };

  constructor() {
    super();
    this.getArrMoviesPop();
    this.getArrMoviesGenre();
  }
  getArrMoviesPop() {
    this.movieServices.getPopylatiry(1).then((arr) => {
      this.setState({
        obj: arr,
      });
    });
  }

  getArrMoviesGenre() {
    this.movieServices.getGenre(1).then((arr) => {
      this.setState({
        genre: arr,
      });
    });
  }
  render() {
    console.log(this.state.genre);
    console.log(this.state.obj);
    if (this.state.obj != null && this.state.genre.length != 0) {
      return (
        <div className="app">
          <div className="tabs-header"></div>
          <form onSubmit={this.onSubmit}>
            <input className="new-todo" placeholder="Type to search..."></input>
          </form>
          <List setOverview={this.setOverview} arrObj={this.state.obj} arrGenre={this.state.genre}></List>
        </div>
      );
    }
  }
}
