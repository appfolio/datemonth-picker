import React, { PropTypes } from 'react';
import Month from './Month';

const PickerMonths = ({ month, visibleMonths, onMonthClick }) => (
  <div className="month col-xs-6">
    <ul>
      {visibleMonths.map((m, i) =>
        <Month selected={month === i} month={m} onClick={() => onMonthClick(i)} />
      )}
    </ul>
  </div>
);

PickerMonths.propTypes = {
  month: PropTypes.string.isRequired,
  visibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMonthClick: PropTypes.func.isRequired
};

export default PickerMonths;
