var pager = require('./component/pager/index');

var feature_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });
  }
};

feature_mod.init();

module.exports = feature_mod;