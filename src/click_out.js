import includes from 'lodash.includes';
import path from './path.js';

// Knockout binding handler to set observable when clicking outside element.

export default {
  init(element, valueAccessor) {
    let value = valueAccessor();
    const listener = event => {
      if (!includes(path(event), element)) {
        value(false);
      }
      return true;
    };
    document.addEventListener('click', listener);
  }
}
