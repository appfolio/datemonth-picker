import range from 'lodash.range';
import { h, Component } from 'preact';
import includes from 'lodash.includes';
import path from './path.js';

import './bootstrap.css';
import './DateMonth.css';

const Label = ({ selected, label, onClick }) => (
  <li className={ selected ? 'selected' : '' } data-value={label} onClick={onClick}>
    {label}
  </li>
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class DateMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      month: props.month,
      year: props.year || (new Date()).getFullYear()
    };
  }

  setMonth(month) {
    this.setState({ month });
  }

  setYear(year) {
    this.setState({ year });
  }

  componentDidMount() {
    this.listener = event => {
      const container = this.base;
      if (container && !includes(path(event), container)) {
        this.setState({ open: false });
      }
      return true;
    };
    document.addEventListener('click', this.listener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener);
  }

  render(props, state) {
    const now = new Date();
    const end = state.year + (now.getFullYear() - state.year) % 10 + 1;
    const start = end - 10;
    const YEARS = range(start, end);
    const can_advance_year = now.getFullYear() - state.year > 9;

    const open = () => this.setState({
      open: true,
      undo: { month: state.month, year: state.year }
    });
    const cancel = () => this.setState({
      open: false,
      month: state.undo.month,
      year: state.undo.year
    });
    const close = () => this.setState({ open: false });
    const toggle = () => this.setState({
      open: !state.open,
      undo: { month: state.month, year: state.year }
    });
    const prev = () => this.setState({ year: state.year - 10 });
    const next = () => {
      if (can_advance_year) {
        const current_year = (new Date()).getFullYear();
        const year = Math.min(state.year + 10, current_year);
        this.setState({ year });
      }
    };

    return (
      <div className="date_month">
        <header>
          <div className="input-group">
            <input name={props.name}
                   value={`${state.month} ${state.year}`}
                   type="text"
                   className="form-control"
                   onfocus={open} />
            <span className="input-group-addon toggle" onClick={toggle}>
              <i className="icon icon-calendar" />
            </span>
          </div>
        </header>
        {state.open ?
          <div className="picker">
            <div className="row">
              <div className="month col-xs-6">
                <ul>
                  {MONTHS.map(month => <Label selected={state.month == month} label={month} onClick={() => this.setMonth(month)} />)}
                </ul>
              </div>

              <div className="year col-xs-6">
                <header className="btn-group btn-group-xs btn-group-justified">
                  <a id="prev" onclick={prev} className="btn btn-default">
                    <i className="icon icon-caret-left"></i>
                  </a>
                  <a id="next" onclick={next} disabled={!can_advance_year} className="btn btn-default">
                    <i className="icon icon-caret-right"></i>
                  </a>
                </header>
                <ul>
                  {YEARS.map(year => <Label selected={state.year == year} label={year} onClick={() => this.setYear(year)} />)}
                </ul>
              </div>
            </div>
            <footer className="text-center">
              <a id="save" className="btn btn-sm btn-default" onclick={close}>OK</a>
              <a id="cancel" className="btn btn-sm btn-default" onclick={cancel}>Cancel</a>
            </footer>
          </div> : null}
      </div>);
  }
}
