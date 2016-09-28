import { h, render } from 'preact';
import DateMonth from './DateMonth.js';
import register from 'preact-custom-element';

register(DateMonth, 'af-datemonth');

if (module.hot) {
  module.hot.accept();
}

