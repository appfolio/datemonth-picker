import { h, render } from 'preact';
import DateMonth from './DateMonth.js';
import fecha from 'fecha';

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date = new Date()) => {
  let initialDate = new Date();
  if (date && typeof date === 'string') {
    const parsedDate = fecha.parse(date, 'MMM YYYY');
    if (parsedDate) {
      initialDate = parsedDate;
    }
  }
  const month = fecha.format(initialDate, 'MMM');
  const year = initialDate.getFullYear();

  render(<DateMonth name={name} month={month} year={year} />, element.parentElement, element);
};

if (module.hot) {
  module.hot.accept();
}

