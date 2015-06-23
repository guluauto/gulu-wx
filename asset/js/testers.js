var pager = require('./component/pager/index');

var testers_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });
  }
};

testers_mod.init();

module.exports = testers_mod;