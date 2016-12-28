import fecha from 'fecha';

const MMM_YYYY_PATTERN = '^\\s*([Jj][Aa][Nn]|[Ff][Ee][Bb]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][Uu][Ll]|[Aa][Uu][Gg]|[Ss][Ee][Pp]|[Oo][Cc][Tt]|[Nn][Oo][Vv]|[Dd][Ee][Cc])\\s+\\d\\d\\d\\d\\s*$';
const MMYY_PATTERN = '^\\s*\\d\\d?(/|-|\\.)?\\d\\d\\s*$';
export const DATE_PATTERN = `(${MMYY_PATTERN})|(${MMM_YYYY_PATTERN})`;

export default function (text) {
  let pattern;
  if (text.match(MMM_YYYY_PATTERN)) {
    pattern = 'MMM YYYY';
  } else if (text.length >= 4 && text.match(MMYY_PATTERN)) {
    pattern = 'MMYY';
  } else {
    return false;
  }
  return fecha.parse(text, pattern);
}
