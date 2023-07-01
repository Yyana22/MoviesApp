import React, { Component } from 'react';
import './App.css';

import MovieServices from '../../service/Services';
import List from '../List/index';

export default class App extends Component {
  movieServices = new MovieServices();
  state = {
    data: null,
  };

  constructor() {
    super();
    this.getArr();
  }
  getArr() {
    this.movieServices
      .getPopylatiry(1)
      // .getI()
      .then((arr) => {
        this.setState({
          data: arr,
        });
      });
  }
  //   componentDidMount() {
  //     this.MovieServices.getPopylatiry(1)
  //       // .getI()
  //       .then((arr) => {
  //         this.setState({
  //           data: arr,
  //         });
  //       });
  //   }
  render() {
    console.log(this.state.data);
    if (this.state.data != null) {
      return (
        <div className="app">
          <div className="tabs-header"></div>
          <form onSubmit={this.onSubmit}>
            <input className="new-todo" placeholder="Type to search..."></input>
          </form>
          <List arr={this.state.data}></List>
        </div>
      );
    }
  }
}
