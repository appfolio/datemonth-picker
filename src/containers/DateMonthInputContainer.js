import { connect } from 'react-redux';
import DateMonthInput from '../components/DateMonthInput';

const mapStateToProps = state => (
  {
    monthYear: state.present.monthYear
  }
);

export default connect(
  mapStateToProps,
  null
)(DateMonthInput);
