import React, { PropTypes } from 'react';

const PickerFooter = ({ closePicker, onCancel }) => (
  <footer className="text-center">
    <a className="btn btn-sm btn-default" onClick={closePicker}>OK</a>
    <a className="btn btn-sm btn-default" onClick={onCancel}>Cancel</a>
  </footer>
);

PickerFooter.propTypes = {
  closePicker: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PickerFooter;
