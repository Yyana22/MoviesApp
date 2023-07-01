import React, { Component } from 'react';

export default class List extends Component {
  id = 100;
  state = {
    elements: [],
  };
  //   constructor() {
  //     super();
  //     this.upDateState(this.props.arr);
  //   }
  // upDateState(data) {
  // 	this.setState(({elements}) => {
  // 		return(
  // 			elements: data,
  // 		)
  // 	})
  // }
  render() {
    console.log(this.props.arr.results);
    let elements = this.props.arr.results.map((item) => {
      console.log(item);
      this.id += 1;
      return <li key={this.id}>{item}</li>;
    });
    console.log(elements);
    return <ul>{/* {elements}	 */} </ul>;
  }
}
