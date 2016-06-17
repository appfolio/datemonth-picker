import React, { PropTypes } from 'react';

const Year = ({ selected, year, onClick }) => (
  <li className={selected ? 'selected' : null} onClick={onClick}>
    {year}
  </li>
);

Year.propTypes = {
  selected: PropTypes.bool,
  year: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Year;
