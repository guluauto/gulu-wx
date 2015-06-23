var pager = require('./component/pager/index');

var reserve_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });
  }
};

reserve_mod.init();

module.exports = reserve_mod;