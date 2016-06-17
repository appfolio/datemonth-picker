import React, { PropTypes } from 'react';
import PickerMonths from './PickerMonths';
import PickerYearsContainer from '../containers/PickerYearsContainer';
import PickerFooterContainer from '../containers/PickerFooterContainer';

const Picker = ({ month, visibleMonths, onMonthClick, closePicker }) => (
  <div className="picker">
    <div className="row">
      <PickerMonths month={month} visibleMonths={visibleMonths} onMonthClick={onMonthClick} />
      <PickerYearsContainer />
    </div>
    <PickerFooterContainer closePicker={closePicker} />
  </div>
);

Picker.propTypes = {
  month: PropTypes.string.isRequired,
  visibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMonthClick: PropTypes.func.isRequired,
  closePicker: PropTypes.func.isRequired
};

export default Picker;
