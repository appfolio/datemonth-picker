import React, { Component } from 'react';
import bs from '../bootstrap.cssmodule';
import fecha from 'fecha';
import includes from 'lodash.includes';
import path from '../path.js';
import range from 'lodash.range';
import { observer } from 'mobx-react';

import '../DateMonth.css';
import Label from './Label.jsx';
import store from '../store';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MMM_YYYY_PATTERN = '^\\s*([Jj][Aa][Nn]|[Ff][Ee][Bb]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][Uu][Ll]|[Aa][Uu][Gg]|[Ss][Ee][Pp]|[Oo][Cc][Tt]|[Nn][Oo][Vv]|[Dd][Ee][Cc])\\s+\\d\\d\\d\\d\\s*$';

@observer
class DateMonth extends Component {
  constructor(props) {
    super(props);

    const date = props.value;

    if (!date) {
      store.setDate(new Date());
    } else {
      const initialDate = fecha.parse(date, 'MMM YYYY');
      if (initialDate) {
        store.setDate(initialDate);
      }
    }
  }

  componentDidMount() {
    this.listener = event => {
      const container = this.base;
      if (container && !includes(path(event), container)) {
        store.setOpen(false);
      }
      return true;
    };
    this.escListener = event => {
      if (event.keyCode === 27) { // ESC
        store.setOpen(false);
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

  render() {
    const { name, required, value } = this.props;
    const now = new Date();
    const end = store.year + (now.getFullYear() - store.year) % 10 + 1;
    const start = end - 10;
    const YEARS = range(start, end);
    const canAdvanceYear = now.getFullYear() - store.year > 9;

    const open = () => store.setOpenAndStoreCurrentState(true);
    const cancel = () => store.closeAndRestoreState();
    const close = () => store.setOpen(false);
    const toggle = () => store.setOpenAndStoreCurrentState(!store.open);
    const prev = () => store.setYear(store.year - 10);
    const next = () => {
      if (canAdvanceYear) {
        const currentYear = (new Date()).getFullYear();
        const year = Math.min(store.year + 10, currentYear);
        store.setYear(year);
      }
    };
    const change = event => {
      if (this._input.checkValidity()) {
        const text = event.target.value.trim();
        const date = fecha.parse(text, 'MMM YYYY');
        if (date) {
          store.setMonthAndYear(MONTHS[date.getMonth()], date.getFullYear());
        }
      }
    };
    const tabListener = event => {
      if (event.keyCode === 9) { // TAB
        store.setOpen(false);
      }
      return true;
    };

    return (
      <div className="date_month">
        <header>
          <div className={bs.inputGroup}>
            <input
              readOnly
              name={name}
              ref={component => { this._input = component; }}
              required={required}
              value={store.monthYearString || value}
              type="text"
              className={bs.formControl}
              onClick={open}
              onFocus={open}
              onInput={change}
              onKeyDown={tabListener}
              pattern={MMM_YYYY_PATTERN}
            />
            <span className={`${bs.inputGroupAddon} toggle`} onClick={toggle}>
              <i className="icon icon-calendar" />
            </span>
          </div>
        </header>
        {store.open ?
          <div className="picker">
            <div className={bs.row}>
              <div className={`month ${bs.colXs6}`}>
                <ul>
                  {MONTHS.map(month => <Label key={month} selected={store.month === month} label={month} onClick={() => store.setMonth(month)} />)}
                </ul>
              </div>

              <div className={`year ${bs.colXs6}`}>
                <header className={`${bs.btnGroup} ${bs.btnGroupXs} ${bs.btnGroupJustified}`}>
                  <a id="prev" onClick={prev} className={`${bs.btn} ${bs.btnDefault}`}>
                    <i className="icon icon-caret-left"></i>
                  </a>
                  <a id="next" onClick={next} disabled={!canAdvanceYear} className={`${bs.btn} ${bs.btnDefault}`}>
                    <i className="icon icon-caret-right"></i>
                  </a>
                </header>
                <ul>
                  {YEARS.map(year => <Label key={year} selected={store.year === year} label={year} onClick={() => store.setYear(year)} />)}
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

export default DateMonth;
