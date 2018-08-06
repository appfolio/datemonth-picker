import dateParse, { DATE_PATTERN } from './date_parse.js';
import fecha from 'fecha';
import includes from 'lodash.includes';
import mod from './mod.js';
import path from './path.js';
import range from 'lodash.range';
import { h, Component } from 'preact';

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

    const date = props.value;
    let month = undefined;
    let year = (new Date()).getFullYear();

    if (!date) {
      const initialDate = new Date();
      month = fecha.format(initialDate, 'MMM');
      year = initialDate.getFullYear();
    } else {
      const initialDate = fecha.parse(date, 'MMM YYYY');
      if (initialDate) {
        month = fecha.format(initialDate, 'MMM');
        year = initialDate.getFullYear();
      }
    }

    this.state = {
      open: false,
      month,
      year
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
    this.escListener = event => {
      if (event.keyCode === 27) { // ESC
        this.setState({ open: false });
      }
      return true;
    };
    document.addEventListener('click', this.listener, { passive: true });
    document.addEventListener('keydown', this.escListener, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener);
    document.removeEventListener('keydown', this.escListener);
  }

  render(props, state) {
    const now = new Date();
    const end = state.year + mod((now.getFullYear() - state.year), 10) + 1;
    const start = end - 10;
    const YEARS = range(start, end);

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
    const next = () => this.setState({ year: state.year + 10 });
    const change = event => {
      if (this._input.checkValidity()) {
        const text = event.target.value.trim();
        const date = dateParse(text);
        if (date) {
          this.setState({
            month: MONTHS[date.getMonth()],
            year: date.getFullYear()
          });
        }
      }
    };
    const tabListener = event => {
      if (event.keyCode === 9) { // TAB
        this.setState({ open: false });
      }
      return true;
    };

    const value = state.month && state.year ? `${state.month} ${state.year}` : props.value;

    return (
      <div className="date_month">
        <header>
          <div className="input-group">
            <input
              className="form-control"
              name={props.name}
              onClick={open}
              onFocus={open}
              onInput={change}
              onKeyDown={tabListener}
              pattern={DATE_PATTERN}
              ref={component => this._input = component}
              required={props.required}
              type="text"
              value={value}
            />
            <span class="input-group-append">
              <button class="btn btn-secondary active px-2 toggle" tabIndex="-1" onClick={toggle} type="button">
                <i aria-hidden="true" class="fa fa-calendar-o fa-fw icon-calendar-o icon-fw icon"></i>
              </button>
            </span>
          </div>
        </header>
        {state.open ?
          <div className="picker">
            <div className="row">
              <div className="month col">
                <ul>
                  {MONTHS.map(month => <Label selected={state.month === month} label={month} onClick={() => this.setMonth(month)} />)}
                </ul>
              </div>

              <div className="year col text-center">
                <header className="btn-group btn-group-sm btn-group-justified">
                  <button id="prev" onClick={prev} className="btn btn-link">
                    <i aria-hidden="true" class="fa fa-angle-left fa-fw icon-angle-left icon-fw icon"></i>
                  </button>
                  <button id="next" onClick={next} className="btn btn-link">
                    <i aria-hidden="true" class="fa fa-angle-right fa-fw icon-angle-right icon-fw icon"></i>
                  </button>
                </header>
                <ul>
                  {YEARS.map(year => <Label selected={state.year === year} label={year} onClick={() => this.setYear(year)} />)}
                </ul>
              </div>
            </div>
            <footer className="text-center">
              <div className="btn-group">
                <button id="save" className="btn btn-sm btn-secondary" onClick={close}>OK</button>
                <button id="cancel" className="btn btn-sm btn-secondary" onClick={cancel}>Cancel</button>
              </div>
            </footer>
          </div> : null}
      </div>);
  }
}
