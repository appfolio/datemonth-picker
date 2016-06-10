import range from 'lodash.range';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec'];

function model(date) {
  const now = new Date();
  let end = date.getFullYear() + (now.getFullYear() - date.getFullYear()) % 10 + 1;
  let start = end - 10;

  let month = date.getMonth();
  let year = date.getFullYear();
  let visible_months = MONTHS; // TODO consider limiting for this year.  Also I18N
  let visible_years = range(start, end);
  return {
    day: 1,
    month,
    year,
    month_year: `${visible_months[month]} ${year}`,
    visible_months,
    visible_years,
    can_advance_year: now.getFullYear() - date.getFullYear() > 9
  }
}

export default function(state = model(new Date), action) {
  switch (action.type) {
    case 'VALUE': {
      const { value } = action;
      const { day, month, year } = state;
      let [m, y] = value.trim().split(/\s+/);
      let date = new Date(y,m,1);
      return model(date);
    }
    case 'DATE': {
      const { date } = action;
      return model(date);
    }
    case 'MONTH': {
      const { month } = action;
      const { day, year } = state;
      return model(new Date(year, month, day));
    }
    case 'YEAR': {
      const { year } = action;
      const { day, month } = state;
      return model(new Date(year, month, day));
    }
    case 'NEXT': {
      const { day, month, year } = state;
      const current_year = (new Date()).getFullYear();
      return model(new Date(Math.min(year + 10, current_year), month, day));
    }
    case 'PREV': {
      const { day, month, year } = state;
      return model(new Date(year - 10, month, day));
    }
    default:
      return state
  }
}
