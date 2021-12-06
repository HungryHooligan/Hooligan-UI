import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TagList from './TagList';

const Filter = forwardRef((props, ref) => {
  const {
    className,
    onChange,
    placeholder,
    showTagsInFilter,
    style,
    tagClassName,
  } = props;

  // TODO: Fix This When Icons Are Fixed
  return (
    <div className={`hooligan-ui-searchable-dropdown-filter ${className}`} style={style}>
      {showTagsInFilter && <TagList className={tagClassName} />}
      <div className="hooligan-ui-searchable-dropdown-filter-input">
        {/* <i className="hooligan-ui-icons-search" /> */}
        <input
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          type="search"
        />
      </div>
    </div>
  );
});

// Fixes ES-Lint Display Name Issue
Filter.displayName = 'Filter';

export default Filter;

Filter.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  showTagsInFilter: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
  tagClassName: PropTypes.string.isRequired,
};
