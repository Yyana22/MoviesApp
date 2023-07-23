import React, { Component } from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import './Item.css';
import GenreList from '../GenreList/GenreList';
export default class Item extends Component {
  state = {
    value: 0,
    text: '',
    loading: false,
  };

  onChange = (e) => {
    this.setState({
      value: e,
    });
  };
  componentDidMount() {
    this.setState({
      text: this.props.setOverview(this.props.info.overview),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      if (value !== 0) {
        return this.props.addMovieRating(this.props.info.id, value);
      }
      return this.props.deleteMovieRating(this.props.info.id, value);
    }
  }
  getStars = (rating, id) => {
    if (rating) {
      return rating;
    }
    try {
      if (JSON.parse(localStorage.getItem('movieRating'))[id]) {
        return JSON.parse(localStorage.getItem('movieRating'))[id];
      }
    } catch {
      return 0;
    }
  };

  releaseDate(release_date) {
    if (!release_date) {
      return 'Date not found';
    }
    const newDate = new Date(release_date);
    return format(newDate, 'MMM dd, yyyy');
  }
  genreId = 10;

  returnColor(rating) {
    if (rating > 0 && rating < 3) {
      return '#E90000';
    } else if (rating > 3 && rating < 5) {
      return '#E97E00';
    } else if (rating > 5 && rating < 7) {
      return '#E9D100';
    }
    return '#66E900';
  }
  render() {
    const { genre_ids, rating, vote_average, poster_path, title, release_date, overview, id } = this.props.info;

    return (
      <div className="item-wrap">
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div className="text-wrap">
          <div className="header-card">
            <h3 className="title">{title ? title : 'Not found'}</h3>
          </div>
          <div className="release-date">{this.releaseDate(release_date)}</div>
          <div className="genres">
            <GenreList arrGenreId={genre_ids ? genre_ids : 'Not found'} />
          </div>
          <p className="overview">{this.props.setOverview(overview)}</p>
          <Rate
            className="stars"
            count={10}
            allowHalf={true}
            allowClear={true}
            defaultValue={this.state.value}
            onChange={this.onChange}
            value={this.getStars(rating, id)}
          />
        </div>
        <div className={'rating'} style={{ borderColor: this.returnColor(vote_average) }}>
          {vote_average}
        </div>
      </div>
    );
  }
}
