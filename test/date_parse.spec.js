/* eslint-env mocha */

import assert from 'assert';
import dateParse from '../src/date_parse.js';

const PATTERN = '\\d\\d?/\\d\\d';

describe('dateParse function', () => {
  it('should return date from MM/YY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('1/01', PATTERN))
    assert.deepEqual(new Date(2016, 11), dateParse('12/16', PATTERN))
  });

  it('should return date from invalid MM/YY', () => {
    assert(dateParse('00/00', PATTERN) instanceof Date)
    assert(dateParse('99/99', PATTERN) instanceof Date)
  });

  it('should return date from MMM YYY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('Jan 2001', PATTERN))
    assert.deepEqual(new Date(2016, 11), dateParse('Dec 2016', PATTERN))
  });

  it('should return date from invalid MMM YYY', () => {
    assert.equal(false, dateParse('Dec 32', PATTERN))
    assert.equal(false, dateParse('Soc 31', PATTERN))
  });

});
