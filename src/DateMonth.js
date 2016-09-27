import bs from './bootstrap.cssmodule';
import fecha from 'fecha';
import includes from 'lodash.includes';
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
const MMM_YYYY_PATTERN = '^\\s*([Jj][Aa][Nn]|[Ff][Ee][Bb]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][Uu][Ll]|[Aa][Uu][Gg]|[Ss][Ee][Pp]|[Oo][Cc][Tt]|[Nn][Oo][Vv]|[Dd][Ee][Cc])\\s+\\d\\d\\d\\d\\s*$';

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
    const change = event => {
      if (this._input.checkValidity()) {
        const text = event.target.value.trim();
        const date = fecha.parse(text, 'MMM YYYY');
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
          <div className={bs.inputGroup}>
            <input
              className={bs.formControl}
              name={props.name}
              onClick={open}
              onFocus={open}
              onInput={change}
              onKeyDown={tabListener}
              pattern={MMM_YYYY_PATTERN}
              ref={component => this._input = component}
              required={props.required}
              type="text"
              value={value}
            />
            <span className={`${bs.inputGroupAddon} toggle`} onClick={toggle}>
              <i className="icon icon-calendar" />
            </span>
          </div>
        </header>
        {state.open ?
          <div className="picker">
            <div className={bs.row}>
              <div className={`month ${bs.colXs6}`}>
                <ul>
                  {MONTHS.map(month => <Label selected={state.month == month} label={month} onClick={() => this.setMonth(month)} />)}
                </ul>
              </div>

              <div className={`year ${bs.colXs6}`}>
                <header className={`${bs.btnGroup} ${bs.btnGroupXs} ${bs.btnGroupJustified}`}>
                  <a id="prev" onClick={prev} className={`${bs.btn} ${bs.btnDefault}`}>
                    <i className="icon icon-caret-left"></i>
                  </a>
                  <a id="next" onClick={next} disabled={!can_advance_year} className={`${bs.btn} ${bs.btnDefault}`}>
                    <i className="icon icon-caret-right"></i>
                  </a>
                </header>
                <ul>
                  {YEARS.map(year => <Label selected={state.year == year} label={year} onClick={() => this.setYear(year)} />)}
                </ul>
              </div>
            </div>
            <footer className={bs.textCenter}>
              <a id="save" className={`${bs.btn} ${bs.btnSm} ${bs.btnDefault}`} onClick={close}>OK</a>
              <a id="cancel" className={`${bs.btn} ${bs.btnSm} ${bs.btnDefault}`} onClick={cancel}>Cancel</a>
            </footer>
          </div> : null}
      </div>);
  }
}
