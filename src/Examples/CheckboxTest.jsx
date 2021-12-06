import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../components/Checkbox';

const CheckboxTest = props => {
  const { exampleContainerStyle } = props;

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <h2>Checkboxes</h2>
      <h3>Example:</h3>
      <div style={{ ...exampleContainerStyle, padding: '15px 10px' }}>
        <Checkbox>
          Normal
        </Checkbox>
        <Checkbox indeterminate>
          Indeterminate
        </Checkbox>
        <Checkbox checked>
          Checked
        </Checkbox>
        <Checkbox error>
          Error
        </Checkbox>
        <Checkbox disabled>
          Disabled
        </Checkbox>
      </div>
    </section>
  );
};

CheckboxTest.propTypes = {
  exampleContainerStyle: PropTypes.shape({}).isRequired,
};

export default CheckboxTest;
