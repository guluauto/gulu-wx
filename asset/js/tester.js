var taber = require('./component/taber/index');

var tester_mod = {
  init: function() {
    new taber({
      active: 'active',
      tabs: '[eid="tab-wrapper"] li',
      contents: '[eid="content-wrapper"] > li'
    });

    $(document).on('touchmove', function(e) {
      if ($(e.target).parents('.intro-body').length) {
        e.stopPropagation();

        return true;
      }

      e.preventDefault();

      return false;
    });
  }
};

tester_mod.init();

module.exports = tester_mod;