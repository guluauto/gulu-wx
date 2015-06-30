var pager = require('./component/pager/index');

var inspect_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });
  }
};

inspect_mod.init();

module.exports = inspect_mod;