import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/Modal';

const ModalTest = props => {
  const { exampleContainerStyle } = props;

  const focusRef = useRef(null);
  const clickRef = useRef(null);

  const btnStyle = {
    padding: '8px',
    margin: '16px',
  };
  const modalStyle = {
    textAlign: 'center',
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <h2>Modal</h2>
      <h3>Example:</h3>
      <div style={exampleContainerStyle}>
        <button type="button" ref={clickRef} style={btnStyle}>
          Click to see Modal
        </button>
        <button type="button" ref={focusRef} style={btnStyle}>
          Focus to see Modal
        </button>
        <Modal type="click" targetRef={clickRef} style={modalStyle}>
          <h3>Click</h3>
        </Modal>
        <Modal type="focus" targetRef={focusRef} style={modalStyle}>
          <h3>Focus</h3>
        </Modal>
      </div>
    </section>
  );
};

ModalTest.propTypes = {
  exampleContainerStyle: PropTypes.shape({}).isRequired,
};

export default ModalTest;
