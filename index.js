var NodeAnimator = (function($el, opts){
  opts = opts || {}
  if (!$el && !opts.styles) {
    throw new NodeAnimatorMissingArg("Must provide both 'element' and 'styles' option to NodeAnimator");
  }

  var fps = opts.fps || 60;
  var duration = opts.duration || 1000
  var onTick = null;
  var onDone = null;
  var onStop = null;
  var endingStyles = opts.styles;
  // Public methods of this module
  //   we store it in a seperate variable so we can make functions
  //   chainable (E.g. on() function)
  var returnObj = {
    on: on,
    begin: begin
  }

  function NodeAnimatorMissingArg(message) {
    var error = new Error(message)
    error.name = "NodeAnimatorArgError";
    return error;
  }

  function on(event, callback) {
    switch (event) {
      case 'tick':
        onTick = callback;
      case 'done':
        onDone = callback;
      default:
        // TODO: Throw an error if event type is not recognized
    }
    return returnObj;
  }

  function begin() {
    var startTime = null;
    var startingStyles = {}
    var currentStyles = {}
    var lastTimeStamp;

    // Function that our animation method will call
    function step(timestamp) {
      if (timestamp < lastTimeStamp) {
        return
      }
      lastTimeStamp = timestamp
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;

      // logic that stops the animation when we are past the specified duration
      if (progress >= duration) {
        clearInterval(interval)
        onDone()
      } else {
        // TODO: Refactor this section
        for (var style in endingStyles) {
          var cssValueArray = splitCssValue(window.getComputedStyle($el)[style]);
          var cssValue = Number(cssValueArray[0])
          var cssValueType = cssValueArray[1] || ""

          // Set the starting value if it doesn't exist yet
          if (!startingStyles[style]) {
            startingStyles[style] = cssValue;
          }

          // Cacluate the increment from the starting style
          var increment =  (parseFloat(endingStyles[style]) - startingStyles[style]) / duration;
          // Set the current style that we're going to pass to the tick function
          currentStyles[style] = (startingStyles[style] + (increment * progress)) + cssValueType
        }
        // Pass the current style to our tick function
        onTick(currentStyles)
      }
    }

    // This 
    var interval = setInterval(function(){
      window.requestAnimationFrame(step)
    }, 1000/fps)
  }

  return returnObj;
})

// TODO: Extract
// Helpers
function splitCssValue(str) {
  var value = parseFloat(str)
  var type = str.match(/[a-zA-Z]+/g)
  return [value, type]
}

module.exports = NodeAnimator;
