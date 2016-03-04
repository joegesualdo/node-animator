
var $square = document.querySelector('#square')
var $circle= document.querySelector('#circle')
$square.addEventListener('click', function(){
NodeAnimator($square, {
  styles: {
    // left: 200,
    // top: 200,
    // width: 500,
    height: 800,
    opacity: 0,
    // borderRadius: 200
  },
  duration: 2000,
  fps: 60 
})
.on('tick', function(styles) {
  console.log(styles)
  var $square = document.querySelector('#square')
  for(var style in styles) {
    $square.style[style] = styles[style]
  }
})

.on('done', function(){
  console.log('done')
})
.begin()
})

// function animateEl(selector, opts){
//   var $el = document.querySelector(selector)
//   for(key in opts.style){
//     el.style
//   }
// }
//
// animateEl('#square', {
//   style: {
//     height: "20px"
//   }
// })
