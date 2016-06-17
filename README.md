# Date/Month picker


## Usage:
```html
<div id="datemonth">
  <input name="datemonth" type="text" value="Nov 1971">
</div>
<script src="DateMonth.js"></script>
<script>
  $(function() {
    var element = $("#datemonth")[0];

    // Pass the element to replace:
    DateMonth(element);
  });
</script>
```
----

## Development

    npm run dev

This will start up a webpack-dev-server so the page will auto-update as you develop.
The app is served at http://localhost:3000/

## Build

    npm install
    npm run dist

## Test

    npm test

## Lint

    npm run lint

Open index.html in browser
