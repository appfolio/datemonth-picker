import range from 'lodash.range';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function model(date) {
  const now = new Date();
  const end = date.getFullYear() + (now.getFullYear() - date.getFullYear()) % 10 + 1;
  const start = end - 10;

  const month = date.getMonth();
  const year = date.getFullYear();
  const visibleMonths = MONTHS; // TODO consider limiting for this year.  Also I18N
  const visibleYears = range(start, end);
  return {
    day: 1,
    month,
    year,
    monthYear: `${visibleMonths[month]} ${year}`,
    visibleMonths,
    visibleYears,
    canAdvanceYear: now.getFullYear() - date.getFullYear() > 9
  };
}

export default function (state = model(new Date), action) {
  switch (action.type) {
    case 'VALUE': {
      const { value } = action;
      const [m, y] = value.trim().split(/\s+/);
      const date = new Date(y, m, 1);
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
      const currentYear = (new Date()).getFullYear();
      return model(new Date(Math.min(year + 10, currentYear), month, day));
    }
    case 'PREV': {
      const { day, month, year } = state;
      return model(new Date(year - 10, month, day));
    }
    default:
      return state;
  }
}
