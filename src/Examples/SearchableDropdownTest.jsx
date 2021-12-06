import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchableDropdown from '../components/SearchableDropdown';

const ButtonTest = props => {
  const { exampleContainerStyle } = props;

  const [optionsToDisplay, setOptionsToDisplay] = useState([]);

  useEffect(() => {
    const options = [...new Array(10)].map((item, index) => ({
      id: index,
      value: Math.round(Math.random() * 100),
    }));

    const optionComponents = options.map(option => (
      <div
        key={option.id}
        option-id={option.id}
        option-value={option.value}
      >
        {option.value}
      </div>
    ));

    setOptionsToDisplay(optionComponents);
  }, []);

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <h2>Searchable Dropdown</h2>
      <h3>Example:</h3>
      <div style={exampleContainerStyle}>
        <SearchableDropdown
          placeholder="Search - Normal"
        >
          {optionsToDisplay}
        </SearchableDropdown>

        <SearchableDropdown
          placeholder="Search - Loading"
          loading
        >
          {optionsToDisplay}
        </SearchableDropdown>

        <SearchableDropdown
          placeholder="Search - Displayed Inline"
          type="inline"
        >
          {optionsToDisplay}
        </SearchableDropdown>

        <SearchableDropdown
          placeholder="Search - Single Select"
          singleSelect
          showTagsInFilter={false}
          type="inline"
        >
          {optionsToDisplay}
        </SearchableDropdown>
      </div>
    </section>
  );
};

ButtonTest.propTypes = {
  exampleContainerStyle: PropTypes.shape({}).isRequired,
};

export default ButtonTest;
