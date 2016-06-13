import Ractive from 'ractive';
import includes from 'lodash.includes';
import path from './path.js';
import template from './DateMonth.html';
import './DateMonth.css';
import './bootstrap.css';

export default Ractive.extend({
  isolated: true,
  data() {
    return {
      open: false
    }
  },
  template: template,
  oninit() {
    this.on({
      cancel() {
        this.set({ open: false })
          .then(this.fire('CANCEL'));
      }
    });
    this.observe('open', open => {
      if (open) this.fire('SAVE');
    });
  },
  onrender() {
    this.listener = event => {
      let container = this.find('.date_month');
      if (container && !includes(path(event), container)) {
        this.set('open', false);
      }
      return true;
    };
    document.addEventListener('click', this.listener);
  },
  onunrender() {
    document.removeEventListener('click', this.listener);
  }
});
