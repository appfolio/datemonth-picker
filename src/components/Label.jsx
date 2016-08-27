import React from 'react';

const Label = ({ selected, label, onClick }) => (
  <li className={selected ? 'selected' : ''} data-value={label} onClick={onClick}>
    {label}
  </li>
);

export default Label;
