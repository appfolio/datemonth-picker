import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import fecha from 'fecha';
import undo from './undo_reducer';
import reducer from './datemonth_reducer';
import DateMonth from './components/DateMonth';
import Ractive from 'ractive';

Ractive.DEBUG = /unminified/.test(() => { /* unminified */ });

// CJS-style export wrapper to avoid `DateMonth.default`:
const x = (element, name = '', date) => {
  const store = createStore(undo(reducer));
  const app = new Ractive({
    el: element,
    components: {
      DateMonth
    },
    data: {
      name,
      store
    },
    template: '<DateMonth name="{{name}}" date={{store.getState().present}} />',
    oninit() {
      this.on({
        'DateMonth.MONTH': (event, month) => store.dispatch({ type: 'MONTH', month }),
        'DateMonth.YEAR': (event, year) => store.dispatch({ type: 'YEAR', year }),
        'DateMonth.NEXT': () => store.dispatch({ type: 'NEXT' }),
        'DateMonth.PREV': () => store.dispatch({ type: 'PREV' }),
        'DateMonth.CANCEL': () => store.dispatch({ type: 'UNDO' }),
        'DateMonth.SAVE': () => store.dispatch({ type: 'SAVE' })
      });
    }
  });
  store.subscribe(() => app.update());

  // Initialize store if date passed
  if (date && typeof date === 'string') {
    const initialDate = fecha.parse(date, 'MMM YYYY');
    store.dispatch({ type: 'DATE', date: initialDate });
  }
};

module.exports = (element, name, value) => {
  const store = createStore(undo(reducer));

  render(
    <Provider store={store}>
      <DateMonth name={name} value={value} />
    </Provider>,
    element
  );
};
