import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Popover from '../components/Popover';

const PopoverTest = props => {
  const { exampleContainerStyle } = props;

  const hoverRef = useRef(null);
  const focusRef = useRef(null);
  const clickRef = useRef(null);

  const btnStyle = {
    padding: '8px',
    margin: '16px',
  };
  const popoverStyle = {
    backgroundColor: '#444',
    border: '#fff solid 2px',
    width: '128px',
    textAlign: 'center',
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <h2>Popover</h2>
      <h3>Example:</h3>
      <div style={exampleContainerStyle}>
        <button type="button" ref={hoverRef} style={btnStyle}>
          Hover to see Popover
        </button>
        <button type="button" ref={clickRef} style={btnStyle}>
          Click to see Popover
        </button>
        <button type="button" ref={focusRef} style={btnStyle}>
          Focus to see Popover
        </button>
        <Popover type="hover" targetRef={hoverRef} style={popoverStyle}>
          <h3>Hover</h3>
        </Popover>
        <Popover type="click" targetRef={clickRef} style={popoverStyle}>
          <h3>Click</h3>
        </Popover>
        <Popover type="focus" targetRef={focusRef} style={popoverStyle}>
          <h3>Focus</h3>
        </Popover>
      </div>
    </section>
  );
};

PopoverTest.propTypes = {
  exampleContainerStyle: PropTypes.shape({}).isRequired,
};

export default PopoverTest;
