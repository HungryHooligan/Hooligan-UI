import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const ButtonTest = props => {
  const { exampleContainerStyle } = props;

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <h2>Buttons</h2>
      <h3>Example:</h3>
      <div style={exampleContainerStyle}>
        <Button value="Focus to see Modal" />
        <Button value="Focus to see Modal" />
      </div>
    </section>
  );
};

ButtonTest.propTypes = {
  exampleContainerStyle: PropTypes.shape({}).isRequired,
};

export default ButtonTest;
