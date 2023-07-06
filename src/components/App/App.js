import React, { Component } from 'react';
import './App.css';
import { Pagination } from 'antd';
// import { debounce } from 'lodash';

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
    inputVal: '',
  };

  componentDidMount() {
    this.getArrMoviesPop();
  }
  componentDidUpdate(prevProps, prevState) {
    const { page, totalPages, obj } = this.state;
    if (prevState.page !== page || prevState.totalPages !== totalPages || prevState.obj !== obj) {
      this.movieServices.getPopylatiry(page).then((res) => {
        this.setState({ obj: res, totalPages: res.total_pages });
      });
    }
  }

  //   log(arr) {
  //     this.setState({ obj: arr, totalPages: arr.total_pages });
  //   }
  //   componentDidUpdate(preмProps, props) {
  //     if (prewProps != props) {
  //       console.log(prewProps.page, props.page);
  //       // this.getArrMoviesPop();
  //       this.movieServices.getPopylatiry(this.state.page).then((arr) => {
  //         if (arr.total_pages > 10000) {
  //           this.setState({ totalPages: 10000, obj: arr });
  //         } else {
  //           this.setState({ totalPages: arr.total_pages, obj: arr });
  //         }
  //       });
  //     }
  //     // this.getArrMoviesPop(); //update moviesList
  //     //  this.getArrMoviesGenre(); //update genresList
  //   }
  getArrMoviesPop() {
    this.movieServices.getPopylatiry(this.state.page).then((arr) => {
      this.setState({ obj: arr });
      if (arr.total_pages > 10000) {
        this.setState({ totalPages: 10000, obj: arr });
      } else {
        this.setState({ totalPages: arr.total_pages, obj: arr });
      }
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
    console.log(this.state.page);
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

  //   changeInput = (e) => {
  //     this.setState({
  //       inputVal: e.target.value,
  //     });
  //   };
  render() {
    if (this.state.obj != null) {
      return (
        <div className="app">
          <div className="tabs-header"></div>
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.changeInput}
              className="search"
              placeholder="Type to search..."
              value={this.state.inputVal}
            ></input>
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
