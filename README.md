# perspector.js
> show the web page perspective


## Install
add the script to your document
```html
<script src="/dist/perspector.js"></script>
```


## Usage
```javascript
// setup the perspector
$.perspector('setup');

// make the pictures perspective with your mouse
$('.picture').perspector('subscribe');

// make the banner swim after 3 seconds
setTimeout(function () {
  $('.banner').perspector('swim');
}, 3000);

// reset the document
$('.reset').on('click', function () {
  $.perspector('teardown');
});
```


## API
### $.perspector(action)
**action** could be:
- "setup"
- "teardown"
- just keep it empty. it will be fine as a toggle function

### $(selector).perspector(action)
**action** could be:
- "swim"
- "sink"
- "subscribe"
- "unsubscribe"


## License
the MIT License
