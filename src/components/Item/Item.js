import React, { Component } from 'react';
import { Rate } from 'antd';
import './Item.css';
export default class Item extends Component {
  state = {
    value: 0,
    genres: [],
    text: '',
  };

  onChange = (e) => {
    this.setState({
      value: e,
    });
  };

  onChangeText() {
    this.setState({
      text: this.props.setOverview(this.props.props.overview),
    });
  }

  setOverview(overview) {
    if (!overview) {
      return 'Description not found';
    } else if (overview.length > 150) {
      console.log(overview.indexOf(' ', 150));
      let stopText = overview.indexOf(' ', 150);
      return overview.slice(0, stopText) + '...';
    } else {
      return overview;
    }
  }

  genreId = 10;
  render() {
    //  console.log(this.props.props.overview);
    //  let genre = this.props.props.genre_ids.map((item) => {
    //    this.genreId += 1;
    //    return <li key={this.genreId}>{item}</li>;
    //  });
    //  let overview = this.props.setOverview(this.props.props.overview);
    return (
      <div className="item-wrap">
        <img src={`https://image.tmdb.org/t/p/w500${this.props.props.poster_path}`} />
        <div className="text-wrap">
          <div className="header-card">
            <h3 className="title">{this.props.props.title}</h3>
            <div className="reiting">{this.props.props.popularity}</div>
          </div>
          <div className="release-date">{this.props.props.release_date}</div>
          <ul className="genres">genre</ul>
          <p className="overview">{this.setOverview(this.props.props.overview)}</p>
          <Rate className="stars" count={10} onChange={this.onChange} value={this.value} />
        </div>
      </div>
    );
  }
}
