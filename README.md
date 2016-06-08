# Date/Month picker example


## Usage:
```html
<script src="DateMonth.js"></script>
<script>
  $(function() {
    // Get current date value from input:
    var date = $("#datemonth input").val();

    // Pass the element to replace, name of the input, and date value:
    DateMonth('#datemonth', 'datemonth', date);
  });
</script>
```
----

## Install & Run:

    npm install
    npm start
    open http://localhost:3000
