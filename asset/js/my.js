var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
var remote = require('./util/remote');
var toast = require('./util/toast');
var taber = require('./component/taber/index');

var my_mod = {
  init: function() {
    new taber({
      active: 'active',
      tabs: '[eid="tab-wrapper"] li',
      contents: '[eid="content-wrapper"] > li'
    });

    $(document).on('touchmove', function(e) {
      if ($(e.target).parents('.service-body').length) {
        e.stopPropagation();

        return true;
      }

      e.preventDefault();

      return false;
    });
  }
};

my_mod.init();

module.exports = my_mod;