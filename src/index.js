import click_out from './click_out.js';
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

  if (!ko.bindingHandlers.click_out) {
    ko.bindingHandlers.click_out = click_out;
  }

  ko.applyBindings({}, element);
}
