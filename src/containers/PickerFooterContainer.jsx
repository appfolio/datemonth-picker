import { connect } from 'react-redux';
import PickerFooter from '../components/PickerFooter';
import { cancel } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onCancel() {
      ownProps.closePicker();
      dispatch(cancel());
    }
  }
);

export default connect(
  null,
  mapDispatchToProps
)(PickerFooter);
