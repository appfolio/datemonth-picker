import { describe, it } from 'mocha';
import assert from 'assert';
import time from '../src/datemonth_reducer.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const label = month => months[month];

describe('datemonth_reducer', () => {
  it('should return the correct initial state', () => {
    const state = time(undefined, {});
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const visibleYears = [];
    for (let y = (year - 9); y <= year; y++) { visibleYears.push(y); }

    assert.equal(state.day, 1);
    assert.equal(state.month, now.getMonth());
    assert.equal(state.year, year);
    assert.deepEqual(state.visibleMonths, months);
    assert.equal(state.monthYear, `${label(month)} ${year}`);
    assert.deepEqual(state.visibleYears, visibleYears);
    assert.equal(state.canAdvanceYear, false);
  });

  it('should not allow advance for current year', () => {
    const now = new Date();
    const state = time(undefined, { type: 'YEAR', year: now.getFullYear() });
    assert.equal(state.canAdvanceYear, false);
  });

  it('should handle DATE', () => {
    const date = new Date(2001, 8, 11);
    const state = time(undefined, { type: 'DATE', date });
    assert.equal(state.day, 1);
    assert.equal(state.month, 8);
    assert.equal(state.year, 2001);
    assert.equal(state.monthYear, 'Sep 2001');
  });

  it('should handle MONTH', () => {
    const state = time(undefined, { type: 'MONTH', month: 0 });
    assert.equal(state.month, 0);
    assert.equal(state.monthYear, `Jan ${state.year}`);
  });

  it('should handle YEAR', () => {
    const state = time(undefined, { type: 'YEAR', year: 1969 });
    assert.equal(state.year, 1969);
    assert.equal(state.monthYear, `${label(state.month)} 1969`);
  });

  it('should handle PREV', () => {
    let state = time(undefined, { type: 'YEAR', year: 1969 });
    state = time(state, { type: 'PREV' });
    assert.equal(state.year, 1959);
    assert.equal(state.monthYear, `${label(state.month)} 1959`);
    assert.equal(state.canAdvanceYear, true);
  });

  it('should handle NEXT', () => {
    let state = time(undefined, { type: 'YEAR', year: 1969 });
    state = time(state, { type: 'NEXT' });
    assert.equal(state.year, 1979);
    assert.equal(state.monthYear, `${label(state.month)} 1979`);
  });
});
