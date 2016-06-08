import ko from 'knockout';
import 'knockout-punches';
ko.punches.enableAll();

import fecha from 'fecha';

import DateMonth from './DateMonth.js';
import template from './DateMonth.html';
import './DateMonth.css';
import './bootstrap.css';

module.exports = (element, name = '', date) => {

  ko.components.register('date-month', {
    viewModel: DateMonth,
    template: template
  });

  // Initialize store if date passed
  var initial_date = new Date();
  if (date) {
    initial_date = fecha.parse(date, 'MMM YYYY');
  }

  let model = {
    date: initial_date
  }

  ko.applyBindings(model);
}
