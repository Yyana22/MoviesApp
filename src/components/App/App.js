import React, { Component } from 'react';
import './App.css';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

import { GenresProvider } from '../Context/context.js';
import MovieServices from '../../service/Services';
import List from '../List/index';
import LoadingSpinner from '../LoadingSpinner/index';
import Error from '../Error/index';

export default class App extends Component {
  movieServices = new MovieServices();
  state = {
    tabPage: 'Search',
    obj: null,
    objFavorite: null,
    genre: null,
    loading: false,
    page: 1,
    totalPages: 0,
    totalFavorite: 0,
    valInput: '',
    guestSession: '',
  };

  componentDidMount() {
    this.movieServices.createGuestSession().then((body) => {
      this.setState({
        guestSession: body.guest_session_id,
      });
    });
    this.getArrMoviesPop();
    this.getArrMoviesGenre();
  }
  componentDidUpdate(prevProps, prevState) {
    const { page, valInput } = this.state;
    if (prevState.page !== page) {
      this.movieServices.getPopylatiry(page).then((res) => {
        if (res.total_pages > 10000) {
          this.setState({ totalPages: 10000, obj: res });
        } else {
          this.setState({ totalPages: res.total_pages, obj: res });
        }
      });
    } else if (prevState.valInput !== valInput) {
      this.movieServices.getMoviesSearch(valInput, page).then((res) => {
        this.setState({ totalPages: res.total_pages, obj: res });
      });
    }
  }
  addMovieRating = (id, rating) => {
    this.movieServices.setMovieRating(id, rating, this.state.guestSession).then(() => {
      this.movieServices.getRatedMovies(this.state.guestSession, 1).then((arr) => {
        this.setState({
          objFavorite: arr,
          totalFavorite: arr.total_pages,
        });
      });
    });
    if (localStorage.getItem('movieRating') === null) {
      const obj = {};
      obj[id] = rating;
      localStorage.setItem('movieRating', JSON.stringify(obj));
    } else {
      const obj = JSON.parse(localStorage.getItem('movieRating'));
      obj[id] = rating;
      localStorage.setItem('movieRating', JSON.stringify(obj));
    }
  };
  deleteMovieRating = (id) => {
    this.movieServices.deleteMovieRating(id, this.state.guestSession);
  };
  getArrMoviesPop() {
    this.movieServices.getPopylatiry(this.state.page).then((arr) => {
      this.setState({
        obj: arr,
        totalPages: arr.total_pages,
      });
    });
  }
  getArrMoviesGenre() {
    this.movieServices.getGenre().then((arr) => {
      this.setState({
        genre: arr,
      });
    });
  }

  changePage = (val) => {
    this.setState({ page: val });
  };

  onChangeTabs = (e) => {
    if (e.target.innerHTML === 'Rated') {
      this.setState({ tabPage: 'Rated' });
    } else {
      this.setState({ tabPage: 'Search' });
    }
  };
  changeInput = debounce((e) => {
    this.setState({ valInput: e.target.value });
  }, 1500);

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
    const form =
      this.state.tabPage === 'Search' ? (
        <form onSubmit={this.onSubmit}>
          <input type="text" className="new-todo" placeholder="Type to search..." onChange={this.changeInput}></input>
        </form>
      ) : null;

    const data = this.state.tabPage === 'Search' ? this.state.obj : this.state.objFavorite;
    if (this.state.obj !== null) {
      return (
        <div className="app">
          <GenresProvider value={this.state.genre}>
            <div className="tabs-header">
              <button onClick={this.onChangeTabs} className={this.state.tabPage === 'Search' ? 'active-btn' : null}>
                Search
              </button>
              <button onClick={this.onChangeTabs} className={this.state.tabPage === 'Rated' ? 'active-btn' : null}>
                Rated
              </button>
            </div>
            {form}
            <List
              setOverview={this.setOverview}
              arrObj={data}
              addMovieRating={this.addMovieRating}
              deleteMovieRating={this.deleteMovieRating}
            ></List>
            <Pagination
              className="pagination-app"
              defaultCurrent={1}
              pageSize={20}
              total={this.state.tabPage === 'Search' ? this.state.totalPages : this.state.totalFavorite}
              defaultPageSize={5}
              onChange={this.changePage}
            ></Pagination>
          </GenresProvider>
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
