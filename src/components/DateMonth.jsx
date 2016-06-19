import React, { Component, PropTypes } from 'react';
import DateMonthInputContainer from '../containers/DateMonthInputContainer';
import PickerContainer from '../containers/PickerContainer';
import { save } from '../actions';
import path from '../path';
import includes from 'lodash.includes';
import '../DateMonth.css';
import '../bootstrap.css';

class DateMonth extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.togglePicker = this.togglePicker.bind(this);
  }

  componentWillMount() {
    const self = this;
    this.listener = event => {
      const container = self.refs.dateMonth;
      if (container && !includes(path(event), container)) {
        self.setState({ open: false });
      }
      return true;
    };
    document.addEventListener('click', this.listener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener);
  }

  togglePicker() {
    this.setState({
      open: !this.state.open
    });
    if (!this.state.open) {
      this.props.dispatch(save());
    }
  }

  render() {
    const picker = this.state.open ? <PickerContainer closePicker={this.togglePicker} /> : null;

    return (
      <div className="date_month" ref="dateMonth">
        <DateMonthInputContainer name={this.props.name} onClick={this.togglePicker} />
        {picker}
      </div>
    );
  }
}

DateMonth.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

export default DateMonth;
