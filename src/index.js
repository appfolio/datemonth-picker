import 'babel-polyfill';
import { h, render } from 'preact';
import DateMonth from './DateMonth.js';

// TODO initialization code

render(<DateMonth name="datemonth" month="Nov" year={1971} />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
