export function updateMonth(month) {
  return { type: 'MONTH', month };
}

export function updateYear(year) {
  return { type: 'YEAR', year };
}

export function prevYears() {
  return { type: 'PREV' };
}

export function nextYears() {
  return { type: 'NEXT' };
}

export function cancel() {
  return { type: 'UNDO' };
}
