import { observable, computed, action } from 'mobx';
import fecha from 'fecha';

class Store {
  @observable open = false;
  @observable month = undefined;
  @observable year = (new Date()).getFullYear();
  @observable undo = undefined;

  @computed
  get monthYearString() {
    return this.month && this.year ? `${this.month} ${this.year}` : null;
  }

  @action setDate(date) {
    this.month = fecha.format(date, 'MMM');
    this.year = date.getFullYear();
  }

  @action setOpen(open) {
    this.open = open;
  }

  @action setMonth(month) {
    this.month = month;
  }

  @action setYear(year) {
    this.year = year;
  }

  @action setMonthAndYear(month, year) {
    this.setMonth(month);
    this.setYear(year);
  }

  @action setUndo(month, year) {
    this.undo = { month, year };
  }

  @action setOpenAndStoreCurrentState(open) {
    this.setOpen(open);
    this.setUndo(this.month, this.year);
  }

  @action closeAndRestoreState() {
    this.setOpen(false);
    this.setMonth(this.undo.month);
    this.setYear(this.undo.year);
  }
}

export default new Store();
