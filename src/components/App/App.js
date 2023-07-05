import React, { Component } from 'react';
import './App.css';
import { Pagination } from 'antd';

import MovieServices from '../../service/Services';
import List from '../List/index';
import LoadingSpinner from '../LoadingSpinner/index';
import Error from '../Error/index';

export default class App extends Component {
  movieServices = new MovieServices();
  state = {
    obj: null,
    genre: ['asd', 'qwes'],
    loading: false,
    page: 1,
    totalPages: 0,
  };

  componentDidMount() {
    this.movieServices.getPopylatiry(this.state.page).then((res) => {
      this.setState({ totalPages: res.total_pages });
    }); //totalPages
    this.getArrMoviesPop(); //first moviesList
    //  this.getArrMoviesGenre(); //first genresList
  }
  componentDidUpdate() {
    this.getArrMoviesPop(); //update moviesList
    //  this.getArrMoviesGenre(); //update genresList
  }
  getArrMoviesPop() {
    this.movieServices.getPopylatiry(this.state.page).then((arr) => {
      this.setState({
        obj: arr,
      });
    });
  }
  //   getArrMoviesGenre() {
  //     this.movieServices.getGenre(1).then((arr) => {
  //       this.setState({
  //         genre: arr,
  //       });
  //     });
  //   }

  changePage = (val) => {
    this.setState((state) => {
      state.page = val;
    });
  };
  setOverview(overview) {
    if (!overview) {
      return 'Description not found';
    } else if (overview.length > 150) {
      let stopText = overview.indexOf(' ', 150);
      return overview.slice(0, stopText) + '...';
    } else {
      return overview;
    }
  }
  render() {
    if (this.state.obj != null && this.state.genre.length != 0) {
      return (
        <div className="app">
          <div className="tabs-header"></div>
          <form onSubmit={this.onSubmit}>
            <input className="new-todo" placeholder="Type to search..."></input>
          </form>
          <List setOverview={this.setOverview} arrObj={this.state.obj} arrGenre={this.state.genre}></List>
          <Pagination
            className="pagination-app"
            defaultCurrent={1}
            pageSize={20}
            total={this.state.totalPages}
            defaultPageSize={5}
            onChange={this.changePage}
          ></Pagination>
        </div>
      );
    } else {
      return <PreviewApp />;
    }
  }
}

const PreviewApp = () => {
  return (
    <React.Fragment>
      <div className="load-error-wrap">
        <LoadingSpinner className="load-app" />
        <Error />
      </div>
    </React.Fragment>
  );
};
