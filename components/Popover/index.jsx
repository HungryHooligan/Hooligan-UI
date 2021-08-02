import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// Example Use:
// const targetRef = useRef(null)
//
// <button ref={targetRef}>
//    Toggle Popover
// </button>
// <Popover type={"hover"|"focus"|"click"} targetRef={targetRef} style={style}>
//     Menu
// </Popover>

// Props:
// --------------------------------------------------
// children - Child Elements To Show in Popover (Optional) (Default: <></>)
// style - CSS Style of Popover (Optional) (Default: {})
// targetRef - React Ref Pointing to Button Toggling (Required)
// type - Action That Will Trigger Popover: Click, Hover, Focus (Optional) (Default: click)

const Popover = props => {
  const {
    children,
    className,
    style,
    targetRef,
    type,
  } = props;

  const popoverRef = useRef(null);
  const [popoverStyles, setPopoverStyles] = useState({});
  const [open, setOpen] = useState(false);

  // Setting Popover Postioning
  useEffect(() => {
    const settingPopover = () => {
      if (!open) return;

      const btnPosition = targetRef.current.getBoundingClientRect();
      const popoverPosition = popoverRef.current.getBoundingClientRect();

      const popoverLocation = {
        top: `${btnPosition.top + btnPosition.height + window.scrollY}px`,
      };

      if ((popoverPosition.width + btnPosition.left + window.scrollX) > window.innerWidth) {
        popoverLocation.right = `${window.innerWidth - btnPosition.right - window.scrollX}px`;
      } else {
        popoverLocation.left = `${btnPosition.left + window.scrollX}px`;
      }

      setPopoverStyles(popoverLocation);
    };

    window.addEventListener('resize', settingPopover);

    settingPopover();

    return () => window.removeEventListener('resize', settingPopover);
  }, [open, targetRef, popoverRef]);

  // Setting Toggle for Button through ref
  useEffect(() => {
    if (targetRef.current) {
      switch (type) {
        case 'hover':
          targetRef.current.onmouseover = () => setOpen(true);
          break;

        case 'focus':
          targetRef.current.onfocus = () => setOpen(true);
          targetRef.current.onblur = () => setOpen(false);
          break;

        default:
          // Click
          targetRef.current.onclick = () => setOpen(!open);
          break;
      }
    }
  }, [targetRef, open, type]);

  // Setting Popover Click Listener
  useEffect(() => {
    // Handles Clicking Off Popover
    const handleClick = event => {
      if (popoverRef.current && targetRef.current) {
        if (!popoverRef.current.contains(event.target)
          && !targetRef.current.contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    const handleWheel = event => {
      if (popoverRef.current) {
        if (!popoverRef.current.contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    if (open) {
      switch (type) {
        case 'hover':
          window.addEventListener('mousemove', handleClick);
          window.addEventListener('wheel', handleWheel);
          break;

        case 'focus':
          window.addEventListener('click', handleClick);
          window.addEventListener('wheel', handleWheel);
          break;

        default:
          window.addEventListener('click', handleClick);
          window.addEventListener('wheel', handleWheel);
          break;
      }
    }

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleClick);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [popoverRef, targetRef, open, type]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      ref={popoverRef}
      className={className}
      style={{
        position: 'absolute',
        zIndex: '999999999999',
        ...popoverStyles,
        ...style,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

Popover.defaultProps = {
  children: null,
  className: '',
  style: {},
  type: 'click',
};

Popover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  style: PropTypes.shape({}),
  targetRef: PropTypes.shape({
    current: PropTypes.shape({
      contains: PropTypes.func,
      getBoundingClientRect: PropTypes.func,
      onclick: PropTypes.func,
      onfocus: PropTypes.func,
      onmouseover: PropTypes.func,
    }),
  }).isRequired,
  type: PropTypes.oneOf(['hover', 'click', 'focus']),
};

export default Popover;
