var pager = require('./component/pager/index');

var flow_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });
  }
};

flow_mod.init();

module.exports = flow_mod;