import React, { PropTypes } from 'react';

const DateMonthInput = ({ name, monthYear, onClick }) => (
  <div className="input-group">
    <input
      name={name}
      type="text"
      className="form-control"
      value={monthYear}
      onClick={onClick}
    />
    <span className="input-group-addon" onClick={onClick}>
      <i className="icon icon-calendar"></i>
    </span>
  </div>
);

DateMonthInput.propTypes = {
  name: PropTypes.string,
  monthYear: PropTypes.string,
  onClick: PropTypes.func
};

export default DateMonthInput;
