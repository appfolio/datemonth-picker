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

## Build

    npm install
    npm run dist

## Test

    npm test

## Lint

    npm run lint

Open index.html in browser
