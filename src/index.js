import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import undo from './undo_reducer';
import reducer from './datemonth_reducer';
import DateMonthContainer from './containers/DateMonthContainer';

module.exports = (element, name, value) => {
  const store = createStore(undo(reducer));

  render(
    <Provider store={store}>
      <DateMonthContainer name={name} value={value} />
    </Provider>,
    element
  );
};
