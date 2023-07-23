import React, { Component } from 'react';

import Item from '../Item/index';
import './List.css';
export default class List extends Component {
  state = {
    elements: [],
    genreEl: [],
  };
  render() {
    if (this.props.arrObj) {
      let elements = this.props.arrObj.results.map((item) => {
        return (
          <li key={item.id}>
            <Item
              setOverview={this.props.setOverview}
              info={item}
              addMovieRating={this.props.addMovieRating}
              deleteMovieRating={this.props.deleteMovieRating}
            ></Item>
          </li>
        );
      });
      return <ul className="list-item">{elements}</ul>;
    }
    return null;
  }
}
