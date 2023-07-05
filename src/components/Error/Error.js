import React, { Component } from 'react';
import { Alert, Space } from 'antd';

import './Error.css';
export default class Error extends Component {
  render() {
    return (
      <Space className="error-app" direction="vertical" style={{ width: '80%' }}>
        <Alert
          message="We can't find any results for your request. But we're sure there's gonna be some Netflix adaptation for...whatever it is..."
          type="error"
          showIcon
          className="error-message"
        />
      </Space>
    );
  }
}
