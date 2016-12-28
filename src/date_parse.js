import fecha from 'fecha';

export default function (text, shortDatePattern) {
  return text.match(shortDatePattern) ? fecha.parse(text, 'MM/YY') :
                                        fecha.parse(text, 'MMM YYYY');
}
