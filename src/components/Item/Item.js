import React, { Component } from 'react';
import { Rate } from 'antd';

import './Item.css';
export default class Item extends Component {
  state = {
    value: 0,
    genres: [],
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
  genreId = 10;
  render() {
    const { poster_path, title, popularity, release_date, overview } = this.props.info;
    return (
      <div className="item-wrap">
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div className="text-wrap">
          <div className="header-card">
            <h3 className="title">{title}</h3>
            <div className="reiting">{popularity}</div>
          </div>
          <div className="release-date">{release_date}</div>
          <ul className="genres">genre</ul>
          <p className="overview">{this.props.setOverview(overview)}</p>
          <Rate className="stars" count={10} onChange={this.onChange} value={this.state.value} />
        </div>
      </div>
    );
  }
}
