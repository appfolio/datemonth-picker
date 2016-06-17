import React, { Component, PropTypes } from 'react';
import DateMonthInputContainer from '../containers/DateMonthInputContainer';
import PickerContainer from '../containers/PickerContainer';
import '../DateMonth.css';
import '../bootstrap.css';

class DateMonth extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onInputClick = this.onInputClick.bind(this);
  }

  onInputClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const picker = this.state.open ? <PickerContainer /> : null;

    return (
      <div className="date_month">
        <DateMonthInputContainer name={this.props.name} onClick={this.onInputClick} />
        {picker}
      </div>
    );
  }
}

DateMonth.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

export default DateMonth;
