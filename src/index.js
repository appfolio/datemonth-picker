import React from 'react';
import ReactDOM from 'react-dom';
import DateMonth from './components/DateMonth.js';
import { useStrict } from 'mobx';

useStrict(true);

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date, required = false) => {
  ReactDOM.render(<DateMonth name={name} value={date} required={required} />, element);
};

if (module.hot) {
  module.hot.accept();
}
