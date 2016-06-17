import { connect } from 'react-redux';
import Picker from '../components/Picker';
import { updateMonth } from '../actions';

const mapStateToProps = state => (
  {
    month: state.present.month,
    visibleMonths: state.present.visibleMonths
  }
);

const mapDispatchToProps = dispatch => (
  {
    onMonthClick(month) {
      dispatch(updateMonth(month));
    }
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picker);
