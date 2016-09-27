/* eslint-env mocha */

import assert from 'assert';
import Nightmare from 'nightmare';
import server from '../dev_server.js';

describe('Render component', () => {
  const browser = (new Nightmare()).goto('http://localhost:8080');

  it('should prepopulated with initial value', () => {
    return browser
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Nov 1971'));
  });

  it('should be closed', () => {
    return browser
      .visible('.picker')
      .then(exists => assert(!exists, 'picker should be closed'));
  });

  it('should open when clicked', () => {
    return browser
      .click('.toggle')
      .visible('.picker')
      .then(exists => assert(exists, 'picker did not open'));
  });

  it('should open when input clicked', () => {
    return browser
      .click('.toggle') // Ensures is closed
      .click('input')
      .visible('.picker')
      .then(exists => assert(exists, 'picker did not open'));
  });

  it('should update value when selecting month', () => {
    return browser
      .click('li[data-value="Jan"]')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Jan 1971'));
  });

  it('should update value when selecting year', () => {
    return browser
      .click('li[data-value="1976"]')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Jan 1976'));
  });

  it('should update value when selecting forward', () => {
    return browser
      .click('#next')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Jan 1986'));
  });

  it('should update value when selecting previous', () => {
    return browser
      .click('#prev')
      .click('#prev')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Jan 1966'));
  });

  it('should revert when clicking cancel', () => {
    return browser
      .click('#cancel')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Nov 1971'));
  });

  it('should update value when clicking OK', () => {
    return browser
      .click('.toggle')
      .click('li[data-value="Mar"]')
      .click('#save')
      .evaluate(() => document.querySelector('input[name="datemonth"]').value)
      .then(value => assert.equal(value, 'Mar 1971'));
  });

  it('should not stop at current year when clicking into future', () => {
    const now = new Date();
    return browser
      .click('.toggle')
      .click('li[data-value="Jun"]')
      .click('#next')
      .click('#next')
      .click('#next')
      .click('#next')
      .click('#next')
      .click('#next')
      .click('#next')
      .evaluate(() => document.querySelector('.year li:last-child').dataset.value)
      .then(value => assert.equal(value, now.getFullYear() + 20));
  });

  it('should close when clicked', () => {
    return browser
      .click('.toggle')
      .visible('.picker')
      .then(exists => assert(!exists, 'picker did not close'));
  });

  it('should close when clicked outside', () => {
    return browser
      .click('input[name="datemonth"]') // Ensures is open
      .click('h2')
      .visible('.picker')
      .then(exists => assert(!exists, 'picker should be closed'));
  });

  it('should close when Escape is pressed', () => {
    return browser
      .click('input[name="datemonth"]') // Ensures is open
      .type('input[name="datemonth"]', '\u001B')
      .visible('.picker')
      .then(exists => assert(!exists, 'picker should be closed'));
  });
});
