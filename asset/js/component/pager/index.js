var touch = require('../../../../bower_components/touch.code.baidu.com/touch-0.2.14');

module.exports = function(container, scroller) {
  var $container = $(container);
  var $scroller = $(scroller);
  var scroller = $scroller.get(0);
  
  var H = $container.height();
  
  var $pgs = $scroller.children();
  var max_page_no = $pgs.length;
  var page_no = 0;

  $pgs.height(H);

  $(document).on('touchmove', function(e) {
    e.preventDefault();

    return false;
  });

  function scroll() {
    if (page_no === -1) {
      page_no = 0;
      return;
    }

    if (page_no === max_page_no) {
      page_no = max_page_no - 1;
      return;
    }

    $scroller.animate({
      translate3d: '0,' + (-page_no * H) + 'px,0'
    }, 300);
  }

  function move(evt) {
    if (page_no === 0 && evt.distanceY > 0 || page_no === max_page_no - 1 && evt.distanceY < 0) {
      return;
    }

    scroller.style.webkitTransform = 'translate3d(0,' + (evt.distanceY - page_no * H) + 'px,0)';
  }

  // touch.on(scroller, 'swipestart', move);

  touch.on(scroller, 'swiping', move);

  touch.on(scroller, 'swipeend', function(evt) {
    if (Math.abs(evt.distanceY) >= 30) {
      if (evt.direction === 'up') {
        page_no++;
      } else if (evt.direction === 'down') {
        page_no--;
      }
    }

    scroll();
  });
}