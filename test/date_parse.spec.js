/* eslint-env mocha */

import assert from 'assert';
import dateParse from '../src/date_parse.js';

describe('dateParse function', () => {
  it('should return date from MM-YY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('1-01'))
    assert.deepEqual(new Date(2001, 0), dateParse('01-01'))
    assert.deepEqual(new Date(2016, 11), dateParse('12-16'))
  });

  it('should return date from MM.YY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('1.01'))
    assert.deepEqual(new Date(2001, 0), dateParse('01.01'))
    assert.deepEqual(new Date(2016, 11), dateParse('12.16'))
  });


  it('should return date from MM/YY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('1/01'))
    assert.deepEqual(new Date(2001, 0), dateParse('01/01'))
    assert.deepEqual(new Date(2016, 11), dateParse('12/16'))
  });

  it('should return date from MMYY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('0101'))
    assert.deepEqual(new Date(2016, 11), dateParse('1216'))
  });

  it('should return date from invalid MM-YY', () => {
    assert(dateParse('00-00') instanceof Date)
    assert(dateParse('99-99') instanceof Date)
  });

  it('should return date from invalid MM.YY', () => {
    assert(dateParse('00.00') instanceof Date)
    assert(dateParse('99.99') instanceof Date)
  });

  it('should return date from invalid MM/YY', () => {
    assert(dateParse('00/00') instanceof Date)
    assert(dateParse('99/99') instanceof Date)
  });

  it('should return date from invalid MMYY', () => {
    assert(dateParse('0000') instanceof Date)
    assert(dateParse('9999') instanceof Date)
  });

  it('should return date from MMM YYY', () => {
    assert.deepEqual(new Date(2001, 0), dateParse('Jan 2001'))
    assert.deepEqual(new Date(2016, 11), dateParse('Dec 2016'))
  });

  it('should return date from invalid MMM YYY', () => {
    assert.equal(false, dateParse('Dec 32'))
    assert.equal(false, dateParse('Sep 0'))
  });

  it('should return date from invalid format', () => {
    assert.equal(false, dateParse('11'))
    assert.equal(false, dateParse('101'))
    assert.equal(false, dateParse('930'))
    assert.equal(false, dateParse('Dep 31'))
    assert.equal(false, dateParse('blah'))
    assert.equal(false, dateParse('10,99'))
    assert.equal(false, dateParse('1-1'))
    assert.equal(false, dateParse('10-1'))
    assert.equal(false, dateParse('1.1'))
    assert.equal(false, dateParse('10.1'))
    assert.equal(false, dateParse('1/1'))
    assert.equal(false, dateParse('10/1'))
  });

});
