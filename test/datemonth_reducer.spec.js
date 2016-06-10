import assert from 'assert';
import time from '../src/datemonth_reducer.js';

const months = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec'];
const label = month => months[month]

describe('datemonth_reducer', () => {
  it('should return the correct initial state', () => {
    let state = time(undefined, {});
    const now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    let visible_years = [];
    for (var y = (year - 9); y <= year; y++) { visible_years.push(y) };

    assert.equal(state.day, 1);
    assert.equal(state.month, now.getMonth());
    assert.equal(state.year, year);
    assert.deepEqual(state.visible_months, months);
    assert.equal(state.month_year, `${label(month)} ${year}`);
    assert.deepEqual(state.visible_years, visible_years)
    assert.equal(state.can_advance_year, false);
  });

  it('should not allow advance for current year', () => {
    let now = new Date();
    let state = time(undefined, { type: 'YEAR', year: now.getFullYear() });
    assert.equal(state.can_advance_year, false);
  });

  it('should handle DATE', () => {
    let date = new Date(2001, 8, 11);
    let state = time(undefined, { type: 'DATE', date: date });
    assert.equal(state.day, 1);
    assert.equal(state.month, 8);
    assert.equal(state.year, 2001);
    assert.equal(state.month_year, `Sep 2001`);
  });

  it('should handle MONTH', () => {
    let state = time(undefined, { type: 'MONTH', month: 0 });
    assert.equal(state.month, 0);
    assert.equal(state.month_year, `Jan ${state.year}`);
  });

  it('should handle YEAR', () => {
    let state = time(undefined, { type: 'YEAR', year: 1969 });
    assert.equal(state.year, 1969);
    assert.equal(state.month_year, `${label(state.month)} 1969`);
  });

  it('should handle PREV', () => {
    var state = time(undefined, { type: 'YEAR', year: 1969 });
    state = time(state, { type: 'PREV' });
    assert.equal(state.year, 1959);
    assert.equal(state.month_year, `${label(state.month)} 1959`);
    assert.equal(state.can_advance_year, true);
  });

  it('should handle NEXT', () => {
    var state = time(undefined, { type: 'YEAR', year: 1969 });
    state = time(state, { type: 'NEXT' });
    assert.equal(state.year, 1979);
    assert.equal(state.month_year, `${label(state.month)} 1979`);
  });

});
