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

const mapDispatchToProps = dispatch => (
  {
    onYearClick(year) {
      dispatch(updateYear(year));
    },
    onPrevClick() {
      dispatch(prevYears());
    },
    onNextClick() {
      dispatch(nextYears());
    }
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickerYears);
