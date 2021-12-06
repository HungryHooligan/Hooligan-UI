import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SearchableDropdownContext from '../SearchableDropdownContext';

const Option = props => {
  const {
    children,
    id,
    noCheck,
    value,
  } = props;

  const {
    onUpdate,
    searchValue,
    setSelected,
    selected,
    singleSelect,
  } = useContext(SearchableDropdownContext);

  const [filteredOut, setFilteredOut] = useState(false);

  // Handles Checking If Option Has Been Filtered Out
  useEffect(() => {
    const generateSearchRegex = filterString => new RegExp(`(?=${filterString})\\w+`, 'gi');

    const checkFilter = filter => {
      let checkedFilter = filter;

      // Preventing non-strings from passing through and crashing it
      if (!checkedFilter || typeof checkedFilter !== 'string') {
        if (typeof checkedFilter !== 'string') {
          console.error(new Error('Hooligan UI - SearchableDropdown: Passed Search Value is not a String'));
        }
        checkedFilter = '';
      }

      const filterRegex = generateSearchRegex(checkedFilter);
      setFilteredOut((String(value).match(filterRegex) === null));
    };
    checkFilter(searchValue);
  }, [searchValue]);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.currentTarget.click();
    }
  };

  const handleClick = () => {
    const item = { id, value };

    if (singleSelect) {
      setSelected([item]);
      onUpdate([item]);
    } else {
      const selectionArray = [].concat(selected);
      const indexInArray = selectionArray.findIndex(element => (element.id === item.id));
      if (indexInArray !== -1) {
        selectionArray.splice(indexInArray, 1);
      } else {
        selectionArray.unshift(item);
      }

      setSelected(selectionArray);
      onUpdate(selectionArray);
    }
  };

  if (filteredOut === true) {
    return (null);
  }

  return (
    <div
      role="option"
      aria-selected={selected.find(item => item.id === id) !== undefined}
      data-value={value}
      data-id={id}
      key={id}
      onKeyPress={handleKeyPress}
      onClick={handleClick}
      tabIndex="0"
    >
      {!noCheck
        && (
          <div
            className="hooligan-ui-searchable-dropdown-option-checkmark"
            style={{
              opacity: (selected.find(item => item.id === id) !== undefined) ? 1 : 0,
            }}
          >
            <i className="hooligan-ui-icons-check" />
          </div>
        )}
      {children}
    </div>
  );
};
export default Option;

Option.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  noCheck: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
