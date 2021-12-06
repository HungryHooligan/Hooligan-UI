import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// Example Use:
// const targetRef = useRef(null)
//
// <button ref={targetRef}>
//    Toggle Popover
// </button>
// <Popover
//  type = { "hover"| "focus" | "click" }
//  targetRef = { targetRef }
//  style = { style }
//  className = { className }
// >
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
  const [defaultPopoverWidth, setDefaultPopoverWidth] = useState(0);
  const [open, setOpen] = useState(false);

  // Making Custom Refresh Popover Event
  const refreshEvent = new Event('hooligan-ui-popover-refresh');

  // Setting Global for Popover Default Width
  useEffect(() => {
    const width = style.width ? parseFloat(style.width.replace(/[^\d.]*/g, '')) : 0;

    setDefaultPopoverWidth(width);
  }, [style]);

  // Setting Popover Postioning
  useEffect(() => {
    // Function to set Popover Position in Window
    const settingPopover = () => {
      if (!open) return;

      const btnPosition = targetRef.current.getBoundingClientRect();

      const popoverLocation = {
        top: `${btnPosition.top + btnPosition.height + window.scrollY}px`,
        right: '',
        left: '',
      };

      const rightSidePosition = btnPosition.right - window.scrollX - defaultPopoverWidth;
      const leftSidePosition = btnPosition.left + window.scrollX;
      const centerPosition = btnPosition.left - (
        (defaultPopoverWidth - (btnPosition.right - btnPosition.left)) / 2
      );

      const rightSideCheck = ((btnPosition.right - window.scrollX - defaultPopoverWidth) > 0)
        && (rightSidePosition > 0);
      const leftSideCheck = ((btnPosition.left + window.scrollX + defaultPopoverWidth)
        < window.innerWidth) && (leftSidePosition > 0);
      const centerCheck = (centerPosition > 0) && ((centerPosition + defaultPopoverWidth)
        < window.innerWidth);

      if (leftSideCheck) {
        popoverLocation.left = `${leftSidePosition}px`;
      } else if (rightSideCheck) {
        popoverLocation.left = `${rightSidePosition}px`;
      } else if (centerCheck) {
        popoverLocation.left = `${centerPosition}px`;
      } else if (defaultPopoverWidth < window.innerWidth) {
        popoverLocation.left = '10px';
      } else {
        popoverLocation.left = '10px';
        popoverLocation.width = `${window.innerWidth - 20}px`;
        popoverLocation.maxWidth = `${window.innerWidth - 20}px`;
        popoverLocation.minWidth = `${window.innerWidth - 20}px`;
      }

      setPopoverStyles(popoverLocation);
    };

    window.addEventListener('resize', settingPopover);
    window.addEventListener('hooligan-ui-popover-refresh', settingPopover);

    settingPopover();

    return () => {
      window.removeEventListener('resize', settingPopover);
      window.removeEventListener('hooligan-ui-popover-refresh', settingPopover);
    };
  }, [open, targetRef, popoverRef, defaultPopoverWidth]);

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
        window.dispatchEvent(refreshEvent);
        if (!popoverRef.current.contains(event.target)
          && !targetRef.current.contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    // Handles Wheel Movement in Modal
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
        ...style,
        ...popoverStyles,
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
