import { h, render } from 'preact';
import DateMonth from './DateMonth.js';
import fecha from 'fecha';

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date = new Date()) => {
  let initialDate = date;
  if (date && typeof date === 'string') {
    initialDate = fecha.parse(date, 'MMM YYYY');
  }
  const month = fecha.format(initialDate, 'MMM');
  const year = initialDate.getFullYear();

  render(<DateMonth name={name} month={month} year={year} />, element.parentElement, element);
};

if (module.hot) {
  module.hot.accept();
}

