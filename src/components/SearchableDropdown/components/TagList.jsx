import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchableDropdownContext from '../SearchableDropdownContext';

const TagList = props => {
  const {
    className,
  } = props;

  const {
    onUpdate,
    setSelected,
    selected,
    singleSelect,
  } = useContext(SearchableDropdownContext);

  const removeSelect = item => {
    const selectionArray = [].concat(selected);
    const indexInArray = selectionArray.findIndex(element => (element.id === item.id));

    if (indexInArray !== -1) {
      selectionArray.splice(indexInArray, 1);
    }

    setSelected(selectionArray);
    onUpdate(selectionArray);
  };

  return (
    <div className="hooligan-ui-searchable-dropdown-tag-list">
      {selected.map(item => (
        <div className={`hooligan-ui-searchable-dropdown-tag ${className}`} key={item.id}>
          <input
            type="button"
            className="hooligan-ui-searchable-dropdown-tag-title"
            data-value={item.value}
            data-id={item.id}
            value={item.value}
            readOnly
          />
          {!singleSelect
            && (
              <button
                type="button"
                className="hooligan-ui-searchable-dropdown-tag-btn"
                data-value={item.value}
                data-id={item.id}
                onClick={() => {
                  removeSelect(item);
                }}
              >
                x
              </button>
            )}
        </div>
      ))}
    </div>
  );
};
export default TagList;

TagList.propTypes = {
  className: PropTypes.string.isRequired,
};
