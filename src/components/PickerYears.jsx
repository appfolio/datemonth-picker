import React, { PropTypes } from 'react';
import Year from './Year';

const PickerYears = ({
  year,
  canAdvanceYear,
  visibleYears,
  onYearClick,
  onPrevClick,
  onNextClick
}) => (
  <div className="year col-xs-6">
    <header className="btn-group btn-group-xs btn-group-justified">
      <a onClick={onPrevClick} className="btn btn-default">
        <i className="icon icon-caret-left"></i>
      </a>
      <a
        onClick={onNextClick}
        disabled={canAdvanceYear ? null : 'disabled'}
        className="btn btn-default"
      >
        <i className="icon icon-caret-right"></i>
      </a>
    </header>
    <ul>
      {visibleYears.map((y) =>
        <Year selected={year === y} year={y} onClick={() => onYearClick(y)} />
      )}
    </ul>
  </div>
);

PickerYears.propTypes = {
  year: PropTypes.number.isRequired,
  canAdvanceYear: PropTypes.bool.isRequired,
  visibleYears: PropTypes.arrayOf(PropTypes.number).isRequired,
  onYearClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default PickerYears;
