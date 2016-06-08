import ko from 'knockout';
import 'knockout-punches';
ko.punches.enableAll();

import DateMonth from './DateMonth.js';
import template from './DateMonth.html';
import './DateMonth.css';
import './bootstrap.css';

module.exports = (element) => {

  if (!ko.components.isRegistered('date-month')) {
    ko.components.register('date-month', {
      viewModel: DateMonth,
      template: template
    });
  }

  ko.applyBindings({}, element);
}
