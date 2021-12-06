import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';
import '../../style/stylesheets/icons.scss';

const labelCursor = {
  error: 'pointer',
  disabled: 'default',
  default: 'pointer',
};

const color = {
  error: '#ffeff0',
  disabled: '#d3d4d5',
  default: '#ffffff',
};

const borderColor = {
  error: {
    unchecked: '#ffeff0',
    checked: '#ffeff0',
    indeterminate: '#ffeff0',
  },
  disabled: {
    unchecked: '#39393a',
    checked: '#39393a',
    indeterminate: '#39393a',
  },
  default: {
    unchecked: '#39393a',
    checked: '#f8ca38',
    indeterminate: '#f8ca38',
  },
};

const backgroundColor = {
  error: {
    unchecked: '#00000000',
    checked: '#00000000',
    indeterminate: '#00000000',
  },
  disabled: {
    unchecked: '#fafafa',
    checked: '#fafafa',
    indeterminate: '#fafafa',
  },
  default: {
    unchecked: '#00000000',
    checked: '#f8ca38',
    indeterminate: '#f8ca38',
  },
};

const textColor = {
  error: '#ffeff0',
  disabled: '#e9eced',
  default: 'inherit',
};

const Checkbox = props => {
  const {
    children,
    className,
    error,
    id,
    checked,
    disabled,
    indeterminate,
    onChange,
    readOnly,
  } = props;

  const [checkedState, setCheckedState] = useState('unchecked');
  const [inputState, setInputState] = useState('default');

  useEffect(() => {
    if (indeterminate) {
      setCheckedState('indeterminate');
    } else if (checked) {
      setCheckedState('checked');
    } else {
      setCheckedState('unchecked');
    }
  }, [checked, indeterminate]);

  useEffect(() => {
    if (disabled) {
      setInputState('disabled');
    } else if (error) {
      setInputState('error');
    } else {
      setInputState('default');
    }
  }, [disabled, error]);

  return (
    <label
      className={`hooligan-ui-checkbox ${className}`}
      style={{ cursor: labelCursor[inputState] }}
      htmlFor={id}
    >
      <input
        aria-checked={indeterminate ? 'mixed' : checked}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(checkedState)}
        disabled={disabled}
        readOnly={readOnly}
      />

      <span
        className="hooligan-ui-checkbox-checkmark"
        style={{
          color: color[inputState],
          backgroundColor: backgroundColor[inputState][checkedState],
          borderColor: borderColor[inputState][checkedState],
        }}
      >
        <span className={indeterminate ? 'hooligan-ui-checkbox-checkmark-indeterminate' : 'hooligan-ui-icons-check'} />
      </span>
      {children && (
        <span className="hooligan-ui-checkbox-children" style={{ color: textColor[inputState] }}>
          {children}
        </span>
      )}
    </label>
  );
};

Checkbox.defaultProps = {
  children: null,
  className: '',
  error: false,
  id: null,
  checked: false,
  disabled: false,
  indeterminate: false,
  onChange: () => { },
  readOnly: false,
};

Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default Checkbox;
