import React, { PropTypes } from 'react';

const Month = ({ selected, month, onClick }) => (
  <li className={selected ? 'selected' : null} onClick={onClick}>
    {month}
  </li>
);

Month.propTypes = {
  selected: PropTypes.bool,
  month: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Month;
