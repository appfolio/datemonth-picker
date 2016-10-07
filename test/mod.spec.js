/* eslint-env mocha */

import assert from 'assert';
import mod from '../src/mod.js';

describe('mod function', () => {
  it('should behave as remainder operator for positive numbers', () => {
    for (let x = 0; x < 10; x++) {
      assert.equal(mod(x, 10), x % 10);
    }
  });

  it('should return positive modulo for negative numbers', () => {
    for (let x = -1; x > 10; x--) {
      assert.equal(mod(x, 10), 10 + (x % 10));
    }
  });
});
