var pager = require('./component/pager/index');

var reserve_mod = {
  init: function() {
    pager('[eid="page"]', '[eid="wrapper"]');
  }
};

reserve_mod.init();

module.exports = reserve_mod;