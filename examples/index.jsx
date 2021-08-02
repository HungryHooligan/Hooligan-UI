import React from 'react';
import PopoverTest from './PopoverTest';
import ModalTest from './ModalTest';

const UIExamples = () => {
  const testPageStyle = {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    padding: '5%',
  };

  const exampleContainerStyle = {
    backgroundColor: '#999',
    border: '#777 solid 4px',
    width: '70%',
    margin: 'auto',
    display: 'flex',
    flexFlow: 'wrap',
  };

  return (
    <div style={testPageStyle}>
      <PopoverTest exampleContainerStyle={exampleContainerStyle} />
      <ModalTest exampleContainerStyle={exampleContainerStyle} />
    </div>
  );
};

export default UIExamples;
