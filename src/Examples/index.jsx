import React from 'react';
import ButtonTest from './ButtonTest';
import CheckboxTest from './CheckboxTest';
import ModalTest from './ModalTest';
import PopoverTest from './PopoverTest';
import SearchableDropdownTest from './SearchableDropdownTest';

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
      {/* <ButtonTest exampleContainerStyle={exampleContainerStyle} /> */}
      <CheckboxTest exampleContainerStyle={exampleContainerStyle} />
      <ModalTest exampleContainerStyle={exampleContainerStyle} />
      <PopoverTest exampleContainerStyle={exampleContainerStyle} />
      <SearchableDropdownTest exampleContainerStyle={exampleContainerStyle} />
    </div>
  );
};

export default UIExamples;
