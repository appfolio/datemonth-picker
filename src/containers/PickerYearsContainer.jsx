import { connect } from 'react-redux';
import PickerYears from '../components/PickerYears';
import { updateYear, prevYears, nextYears } from '../actions';

const mapStateToProps = state => (
  {
    year: state.present.year,
    canAdvanceYear: state.present.canAdvanceYear,
    visibleYears: state.present.visibleYears
  }
);

export default connect(
  mapStateToProps,
  {
    onYearClick: updateYear,
    onPrevClick: prevYears,
    onNextClick: nextYears
  }
)(PickerYears);
