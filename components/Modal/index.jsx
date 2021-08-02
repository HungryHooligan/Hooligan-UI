import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './modal.scss';

// Example Use:
// const targetRef = useRef(null)
//
// <button ref={targetRef}>
//    Toggle Modal
// </button>
// <Modal type={"focus"|"click"} targetRef={targetRef} style={style}>
//     Menu
// </Modal>

// Props:
// --------------------------------------------------
// children - Child Elements To Show in Popover (Optional) (Default: <></>)
// style - CSS Style of Popover (Optional) (Default: {})
// targetRef - React Ref Pointing to Button Toggling (Required)
// type - Action That Will Trigger Popover: Click, Focus (Optional) (Default: click)

const Modal = props => {
  const {
    children,
    style,
    targetRef,
    type,
  } = props;

  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Setting Toggle for Button through ref
  useEffect(() => {
    if (targetRef.current) {
      if (type === 'focus') {
        targetRef.current.onfocus = () => setOpen(true);
      } else {
        targetRef.current.onclick = () => setOpen(!open);
      }
    }
  }, [targetRef, open, type]);

  // Setting Modal Click Listener
  useEffect(() => {
    // Handles Clicking Off Modal
    const handleClick = event => {
      if (modalRef.current && targetRef.current) {
        if (!modalRef.current.contains(event.target)
          && !targetRef.current.contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    const handleWheel = event => {
      if (modalRef.current) {
        if (!modalRef.current.contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    if (open) {
      window.addEventListener('click', handleClick);
      window.addEventListener('wheel', handleWheel);
    }

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [modalRef, targetRef, open]);

  const handleModalClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.currentTarget.click();
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      ref={modalRef}
      className="hooligan-modal hooligan-modal-fade"
      style={{
        zIndex: '999999999',
        ...style,
      }}
    >
      <div className="hooligan-modal-overlay" onClick={handleModalClose} role="none" />
      <span
        role="button"
        aria-label="close"
        className="hooligan-modal-close"
        onKeyPress={handleKeyPress}
        onClick={handleModalClose}
        tabIndex={0}
      >
        x
      </span>
      <div className="hooligan-modal-body">
        {children}
      </div>
    </div>,
    document.body,
  );
};

Modal.defaultProps = {
  children: <></>,
  style: {},
  type: 'click',
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.shape({}),
  targetRef: PropTypes.shape({
    current: PropTypes.shape({
      contains: PropTypes.func,
      getBoundingClientRect: PropTypes.func,
      onclick: PropTypes.func,
      onfocus: PropTypes.func,
    }),
  }).isRequired,
  type: PropTypes.oneOf(['click', 'focus']),
};

export default Modal;
