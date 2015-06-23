var touch = require('../../../../bower_components/touch.code.baidu.com/touch-0.2.14');

module.exports = swiper;

function swiper(options) {
  this.$container = $(options.container);
  this.$group = $('.pg-pic-group', this.$container);
  this.$pics = $('.pg-pic', this.$group);

  this.$indicator_container = $(options.indicators, this.$container);
  this.indicator_tpl = '<span data-index="{{index}}"></span>';

  this.count = this.$pics.length;

  var self = this;
  
  $(window).on('load', function() {
    self.H = self.$pics.eq(0).height();
    self.W = self.$pics.eq(0).width();  

    self.init();
  });
}

swiper.translate = function(el, x, y, z) {
  x = x || 0;
  y = y || 0;
  z = z || 0;

  el.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
}

swiper.prototype.init = function() {
  var self = this;

  // 设置 group 宽、高度
  this.$group.width(this.W);
  this.$group.height(self.H);

  // 自动生成 indicators
  var indicators_inner_html = '';

  for (var i = 0; i < this.count; i++) {
    indicators_inner_html += this.indicator_tpl.replace(/{{index}}/, i);
  }

  this.$indicator_container.html(indicators_inner_html);

  this.$indicators = $('span', this.$indicator_container);

  // 当前 pic
  this.current = 0;
  this.$indicators.eq(this.current).addClass('active');

  // 隐藏未激活项
  this.$pics.each(function(index) {
    if (index === self.current) {
      return;
    }

    $(this).css({
      opacity: 0
    });
  });

  this.bindEvt();
}

swiper.prototype.next_index = function(direction) {
  if (direction === 'left') {
    if (this.current === this.count - 1) {
      return 0;
    }

    return (this.current + 1);
  }

  if (direction === 'right') {
    if (this.current === 0) {
      return (this.count - 1);
    }

    return (this.current - 1);
  }
}

swiper.prototype.move_next = function(el, direction, x) {
  var f = direction === 'left' ? 1 : -1;

  swiper.translate(el, f * this.W + (x || 0));
}

swiper.prototype.end = function(current_el, next_el, next, direction) {
  var self = this;
  var $animate_els = $([next_el, current_el]);

  $animate_els.css({
    transition: 'transform 0.3s ease'
  });

  setTimeout(function() {
    $animate_els.css({
      transition: 'none'
    });

    $(current_el).css({
      opacity: 0
    });

    self.current = next;
  }, 300);

  swiper.translate(next_el, 0);
  swiper.translate(current_el, direction === 'left' ? -self.W : self.W);

  self.$indicators.eq(self.current).removeClass('active');
  self.$indicators.eq(next).addClass('active');
}

swiper.prototype.bindEvt = function() {
  var self = this;

  var next, next_el, current_el;

  // bind swipe event
  touch.on(this.$container.get(0), 'swipestart', function(evt) {
    if (evt.direction === 'right' || evt.direction === 'left') {
      next = self.next_index(evt.direction);
    
      current_el = self.$pics.get(self.current);
      next_el = self.$pics.get(next);

      $(next_el).css({
        opacity: 1
      });
      
      self.move_next(next_el, evt.direction, evt.distanceX);
    }
  });
  
  touch.on(this.$container.get(0), 'swiping', function(evt) {
    if (evt.direction === 'right' || evt.direction === 'left') {
      swiper.translate(current_el, evt.distanceX);
      self.move_next(next_el, evt.direction, evt.distanceX);
    }
  });

  touch.on(this.$container.get(0), 'swipeend', function(evt) {
    if (evt.direction === 'right' || evt.direction === 'left') {
      self.end(current_el, next_el, next, evt.direction);
    }
  });

  touch.on(this.$indicator_container.get(0), 'tap', 'span', function(evt) {
    var $a = $(evt.target);

    if ($a.hasClass('active')) {
      return;
    }

    var i = parseInt($a.attr('data-index'));

    var current_el = self.$pics.get(self.current);
    var next_el = self.$pics.get(i);
    var direction = (i - self.current > 0) ? 'left' : 'right';

    $(next_el).css({
      opacity: 1
    });

    self.move_next(next_el, direction);

    self.end(current_el, next_el, i, direction);
  });
}