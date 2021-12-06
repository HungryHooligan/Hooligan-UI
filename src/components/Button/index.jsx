import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

// Example Use:
// <Button>
//    Toggle Modal
// </Button>

// Props:
// --------------------------------------------------
// className = Class to add to button (Optional)
// disabled = Button Disabled (Optional) (Default: false)
// icon = Icon to Place in Button (Optional) (Default: null)
// iconPlacement = Location of Icon in Button (Optional) (Default: left) (Options: left, right)
// loading = Button Loading (Optional) (Default: false)
// onClick = Function for when Button is hit (Optional) (Default: null)
// outline = Turns Button into Outline Color Only (Optional) (Default: false)
// shape = Button Shape (Optional) (Default: Default) (Options: default, circle, round)
// size = Size of Button (Optional) (Default: md) (Opitions: lg, md, sm)
// type = Type of Button (Optional) (Default: Default)
//        (Options: Default, Primary, Secondary, Success, Warning, Info, Text, Link)
// value = Text for Button (Required)

// TODO: Actually Finish Coding Buttons
const Button = props => {
  const {
    className,
    disabled,
    icon,
    iconPlacement,
    loading,
    onClick,
    outline,
    shape,
    size,
    style,
    type,
    value,
  } = props;

  const handleClick = event => {
    if (disabled) {
      return null;
    }

    return onClick({
      event,
      value,
    });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter' && !disabled) {
      event.currentTarget.click();
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div
      className={` ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      style={{
        ...style,
      }}
      tabIndex="0"
    >
      {icon && <img src={icon} alt={value} />}
      {value}
    </div>
  );
};

Button.defaultProps = {
  className: '',
  disabled: false,
  icon: null,
  iconPlacement: 'left',
  loading: false,
  onClick: null,
  outline: false,
  shape: 'default',
  size: 'md',
  style: {},
  type: 'Default',
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconPlacement: PropTypes.oneOf([
    'left',
    'right',
  ]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  shape: PropTypes.oneOf([
    'default',
    'circle',
    'round',
  ]),
  size: PropTypes.oneOf([
    'lg',
    'md',
    'sm',
  ]),
  style: PropTypes.shape({}),
  type: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'text',
    'link',
  ]),
  value: PropTypes.string.isRequired,
};

export default Button;
