var _ = require('lodash');

var scroller = {
  init: function() {
    var lastPos = $(window).height();
    var winH = $(window).height();
    
    $(window).on('scroll', _.debounce(function() {
      var docH = $(document).height();
      var winScrollTop = $(window).scrollTop();

      var currentPos = winH + winScrollTop;

      if (currentPos > lastPos && currentPos >= docH - 200) {
        scroller.end_cb.call(scroller);
      }

      lastPos = currentPos;
    }, 100));
  },

  end: function(cb) {
    this.end_cb = cb;

    return this;
  },

  start: function(cb) {
    this.start_cb = cb;

    return this
  }
};

scroller.init();

module.exports = scroller;