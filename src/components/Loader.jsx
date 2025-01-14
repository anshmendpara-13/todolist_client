import React from 'react';
import { Spin } from 'antd';

const Loader = () => {
  const loaderStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '200px',
    width: '100%',
  };

  return (
    <div style={loaderStyles}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loader;
