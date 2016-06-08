# Date/Month picker example


## Usage:
```html
<span id="datemonth" data-bind="component: { name:'date-month', params: { date: 'Sep 1975', name: 'datemonth' }}"></span>
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

Open index.html in browser
