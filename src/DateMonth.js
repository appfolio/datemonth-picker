import { computed, observable } from 'knockout';
import fecha from 'fecha';
import range from 'lodash.range';

export default class DateModel {
  constructor(params) {
    let { date = new Date(), name = '', open = false } = params;

    let now = typeof date == 'object' ? date : fecha.parse(date, 'MMM YYYY');
    this.name = name;
    this.open = observable(open);

    this.day = 1;
    this.month = observable(now.getMonth());
    this.year = observable(now.getFullYear());
    this.undo = observable(now);

    this.date = computed(() => new Date(this.year(), this.month(), this.day));
    this.visible_months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; // TODO consider limiting for this year.  Also I18N

    this.visible_years = computed(() => {
      let now = new Date();
      let end = this.date().getFullYear() + (now.getFullYear() - this.date().getFullYear()) % 10 + 1;
      let start = end - 10;
      return range(start, end);
    });

    this.month_year = computed(() => `${this.visible_months[this.month()]} ${this.year()}`);
    this.can_advance_year = computed(() => {
      let now = new Date();
      return now.getFullYear() - this.date().getFullYear() > 9
    });

    this.open.subscribe(value => {
      this.undo(this.date());
    });

    // TODO add document listener to hide picker on outside click
  }

  // TODO add dispose to remove document listener to hide picker

  cancel() {
    let month = this.undo().getMonth();
    let year = this.undo().getFullYear();
    this.month(month);
    this.year(year);
    this.open(false)
  }
  prev() {
    this.year(this.year() - 10);
  }
  next() {
    this.year(this.year() + 10);
  }
};
