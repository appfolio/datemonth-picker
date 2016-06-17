import React, { PropTypes } from 'react';

const PickerFooter = ({ onOk, onCancel }) => (
  <footer className="text-center">
    <a className="btn btn-sm btn-default" onClick={onOk}>OK</a>
    <a className="btn btn-sm btn-default" onClick={onCancel}>Cancel</a>
  </footer>
);

PickerFooter.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PickerFooter;
