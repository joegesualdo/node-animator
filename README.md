## Node Animator
> Animate style changes on DOM Nodes

## Install
```
$ npm install --save node-animator
```

## Example
```javascript
var NodeAnimator = require("node-animator")
var $square = document.querySelector('#square')

NodeAnimator($square, {
  styles: {
    width: 500,
    height: 800,
    opacity: 0,
  },
  duration: 2000,
  fps: 60 
})
.on('tick', function(styles) {
  var $square = document.querySelector('#square')

  for(var style in styles) {
    $square.style[style] = styles[style]
  }
})
.on('done', function(){
  console.log('done')
})
.begin()
```
