import { connect } from 'react-redux';
import Picker from '../components/Picker';
import { updateMonth } from '../actions';

const mapStateToProps = state => (
  {
    month: state.present.month,
    visibleMonths: state.present.visibleMonths
  }
);

export default connect(
  mapStateToProps,
  { onMonthClick: updateMonth }
)(Picker);
