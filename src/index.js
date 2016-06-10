import { createStore } from 'redux';
import fecha from 'fecha';
import undo from './undo_reducer.js';
import reducer from './datemonth_reducer.js';
import DateMonth from './DateMonth.js';
import Ractive from 'ractive';

Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date) => {

  const store = createStore(undo(reducer));
  const app = new Ractive({
    el: element,
    components: {
      DateMonth
    },
    data: {
      name: name,
      store
    },
    template: `<DateMonth name="{{name}}" date={{store.getState().present}} />`,
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
  if (date && typeof date == 'string') {
    let initial_date = fecha.parse(date, 'MMM YYYY');
    store.dispatch({ type: 'DATE', date: initial_date });
  }
}
