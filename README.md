# Date/Month picker example


## Usage:
```html
<div id="datemonth" data-bind="component: { name:'date-month', params: { name: name, date: date }}">
  <input name="datemonth" type="text" value="Nov 1971">
</div>
<script src="DateMonth.js"></script>
<script>
  $(function() {
    // Get current date value from input:
    var date = $("#datemonth input").val();

    // Pass the element to replace, name of the input, and date value:
    DateMonth($("#datemonth")[0], 'datemonth', date);
  });
</script>
```
----

## Install & Run:

    npm install
    npm start
    open http://localhost:3000
