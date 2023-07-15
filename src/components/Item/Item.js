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
        this.props.addMovieRating(this.props.info.id, value);
      } else {
        this.props.deleteMovieRating(this.props.info.id, value);
      }
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
  genreId = 10;
  render() {
    const { genre_ids, rating, vote_average, poster_path, title, release_date, overview, id } = this.props.info;
    let color;
    if (vote_average > 0 && vote_average < 3) {
      color = '#E90000';
    } else if (vote_average > 3 && vote_average < 5) {
      color = '#E97E00';
    } else if (vote_average > 5 && vote_average < 7) {
      color = '#E9D100';
    } else {
      color = '#66E900';
    }
    const newDate = new Date(release_date);
    return (
      <div className="item-wrap">
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div className="text-wrap">
          <div className="header-card">
            <h3 className="title">{title}</h3>
          </div>
          <div className="release-date">{format(newDate, 'MMM dd, yyyy')}</div>
          <div className="genres">
            <GenreList arrGenreId={genre_ids} />
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
            // value={rating ? rating : this.state.value}
          />
        </div>
        <div className={'rating'} style={{ borderColor: color }}>
          {vote_average}
        </div>
      </div>
    );
  }
}
