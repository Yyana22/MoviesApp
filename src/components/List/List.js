import React, { Component } from 'react';

import Item from '../Item/index';
import './List.css';
export default class List extends Component {
  id = 100;
  state = {
    elements: [],
    genreEl: [],
  };
  render() {
    if (this.props.arrObj) {
      let elements = this.props.arrObj.results.map((item) => {
        this.id += 1;
        return (
          <li key={this.id}>
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
    } else return null;
  }
}
