import { h, render } from 'preact';
import DateMonth from './DateMonth.js';

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date) => {
  render(<DateMonth name={name} value={date} />, element.parentElement, element);
};

if (module.hot) {
  module.hot.accept();
}

