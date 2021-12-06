import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const Dropdown = props => {
  const {
    children,
    className,
    noCheck,
    style,
  } = props;

  const [childOptions, setChildOptions] = useState([]);

  useEffect(() => {
    if (children) {
      const optionComponents = children.map(item => (
        <Option
          id={item.props['option-id']}
          key={item.props['option-id']}
          value={item.props['option-value']}
          noCheck={noCheck}
        >
          {item}
        </Option>
      ));
      setChildOptions(optionComponents);
    }
  }, [children]);

  return (
    <div className={`hooligan-ui-searchable-dropdown-dropdown ${className}`} style={style}>
      {childOptions}
    </div>
  );
};

Dropdown.defaultProps = {
  className: '',
  style: {},
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  noCheck: PropTypes.bool.isRequired,
  style: PropTypes.shape({}),
};

export default Dropdown;
