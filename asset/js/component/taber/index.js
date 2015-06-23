var touch = require('../../../../bower_components/touch.code.baidu.com/touch-0.2.14');

function taber(options) {
  this.options = options;

  this.$tabs = $(options.tabs);
  this.$conts = $(options.contents);

  this.init();
}

taber.prototype.init = function() {
  this.current = 0;

  this.$tabs.eq(0).addClass(this.options.active);
  this.$conts.eq(0).fadeIn();

  this.bind_evt();
}

taber.prototype.bind_evt = function() {
  var self = this;

  touch.on(this.$tabs, 'tap', function() {
    self.switch_tab.apply(self, arguments);
  });
}

taber.prototype.switch_tab = function(evt) {
  var index = this.$tabs.index(evt.currentTarget);

  if (index === this.current) {
    return;
  }

  var $target = $(evt.currentTarget);

  // 激活 tab 样式
  this.$tabs.eq(this.current).removeClass(this.options.active);
  $target.addClass(this.options.active);

  // 切换内容
  this.$conts.eq(this.current).fadeOut();
  this.$conts.eq(index).fadeIn();

  this.current = index;
}

module.exports = taber;