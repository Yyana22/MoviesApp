import React, { Component } from 'react';
import { Spin } from 'antd';

import './LoadingSpinner.css';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spin-wrap">
        <Spin size="large" className="spin" />
      </div>
    );
  }
}
