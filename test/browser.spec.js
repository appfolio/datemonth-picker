/* eslint-env mocha */

import Browser from 'zombie';
import server from '../dev_server.js';

Browser.localhost('example.com', 8080);

describe('Render component', () => {
  const browser = new Browser();
  browser.waitFor = 1000;

  before(done => {
    browser.visit('/', done);
  });

  it('should be prepopulated with initial value and closed', () => {
    browser.assert.input('input[name="datemonth"]', 'Nov 1971');
    browser.assert.elements('.picker', 0);
  });

  // TODO open/close, pick dates, verify values, etc
});
