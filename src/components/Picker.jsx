import React, { PropTypes } from 'react';
import PickerFooter from './PickerFooter';
import Month from './Month';

const Picker = ({ month, visibleMonths, onMonthClick, onOk, onCancel }) => (
  <div className="picker">
    <div className="row">
      <div className="month col-xs-6">
        <ul>
          {visibleMonths.map((m, i) =>
            <Month selected={month === i} month={m} onClick={() => onMonthClick(i)} />
          )}
        </ul>
      </div>
    </div>
    <PickerFooter onOk={onOk} onCancel={onCancel} />
  </div>
);

Picker.propTypes = {
  month: PropTypes.string.isRequired,
  visibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMonthClick: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Picker;
