import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import Dropdown from './components/Dropdown';
import Filter from './components/Filter';
import SearchableDropdownContext from './SearchableDropdownContext';
import './searchableDropdown.scss';

// Example Data:
// --------------------------------------------------
// initSelected = [{id, value}]

const SearchableDropdown = props => {
  const {
    children,
    containerClass,
    dropdownClass,
    filterClass,
    loading: parentLoading,
    noCheck,
    onUpdate,
    placeholder,
    initSelected,
    showTagsInFilter,
    singleSelect,
    tagClass,
    type,
  } = props;

  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [style, setStyle] = useState({
    width: containerRef.current ? `${containerRef.current.getBoundingClientRect().width}px` : '304px',
    backgroundColor: '#111111',
    textAlign: 'center',
  });

  const handleSearchUpdate = () => {
    setSearchValue(targetRef.current.value);
  };

  useEffect(() => {
    if (!parentLoading && isLoading) {
      setSelected([].concat(initSelected));
      setIsLoading(false);
    }
  }, [isLoading, parentLoading, initSelected]);

  const dropdownData = {
    onUpdate,
    searchValue,
    setSelected,
    selected,
    showTagsInFilter,
    singleSelect,
  };

  return (
    <SearchableDropdownContext.Provider value={dropdownData}>
      <div
        className={`hooligan-ui-searchable-dropdown-container ${containerClass}`}
        ref={containerRef}
      >
        <Filter
          className={filterClass}
          ref={targetRef}
          onChange={handleSearchUpdate}
          placeholder={placeholder}
          showTagsInFilter={showTagsInFilter}
          style={{}}
          tagClassName={tagClass}
        />
        {!isLoading && (
          (type === 'popover')
            ? (
              <Popover
                type="click"
                targetRef={targetRef}
                style={style}
              >
                <Dropdown
                  className={dropdownClass}
                  noCheck={noCheck}
                >
                  {children}
                </Dropdown>
              </Popover>
            )
            : (
              <Dropdown
                className={dropdownClass}
                noCheck={noCheck}
              >
                {children}
              </Dropdown>
            ))}
      </div>
    </SearchableDropdownContext.Provider>
  );
};

SearchableDropdown.defaultProps = {
  containerClass: '',
  filterClass: '',
  dropdownClass: '',
  initSelected: [],
  loading: false,
  noCheck: false,
  onUpdate: () => {},
  placeholder: '',
  showTagsInFilter: true,
  singleSelect: false,
  tagClass: '',
  type: 'popover',
};

SearchableDropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  containerClass: PropTypes.string,
  dropdownClass: PropTypes.string,
  filterClass: PropTypes.string,
  initSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  noCheck: PropTypes.bool,
  onUpdate: PropTypes.func,
  placeholder: PropTypes.string,
  showTagsInFilter: PropTypes.bool,
  singleSelect: PropTypes.bool,
  tagClass: PropTypes.string,
  type: PropTypes.oneOf(['popover', 'inline']),
};

export default SearchableDropdown;
