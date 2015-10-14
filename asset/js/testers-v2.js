var pager = require('./component/pager/index');

var testers_mod = {
  init: function() {
    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });

    this.$pgbgs = $('.pg .bg');
    this.pager = pager('[eid="page"]', '[eid="wrapper"]');
    var $nexter = $('[eid="nexter"]');

    var self = this;

    $(window).on('load', function() {
      self.pg_bg_ani.call(self);
    });

    this.pager.on('scroll', function(e, page_no) {
      if (self.pager.MAX_PAGE_NO != page_no) {
        return $nexter.show();
      }

      $nexter.hide();
    });
  },

  init_ani: function() {
    this.BG_W = this.$pgbgs.eq(0).find('img').width();
    this.DEVICE_W = $('[eid="page"]').width();
    this.MAX_DELTA_LEFT = this.BG_W - this.DEVICE_W;
    this.$pgbgs.css({
      left: -this.MAX_DELTA_LEFT / 2
    });

    this.$pgbgs.width(this.BG_W);
  },

  pg_bg_ani: function() {
    var self = this;

    this.init_ani();

    this.$pgbgs.each(function() {
      var $current = $(this);

      $current.current_pos = 0;

      self.ani.call(self, $current);
    });
  },

  ani: function($el) {
    var self = this;
    var current_pos = parseInt($el.current_pos);
    var target_pos, target_trans_x;

    switch(current_pos) {
      case 0:
      case -1:
        target_trans_x = -this.MAX_DELTA_LEFT / 2;
        target_pos = 1;
        break;
      case 1:
        target_trans_x = this.MAX_DELTA_LEFT / 2;
        target_pos = -1;
        break;
      default:
        target_trans_x = 0;
        target_pos = 1;
    }

    var time = current_pos === 0 ? 6000 : 12000;

    $el.current_pos = target_pos;

    $el.animate({
      translate3d: target_trans_x + 'px,0,0'
    }, time, 'ease', function() {
      self.ani($el);
    }, 2000);
  }
};

testers_mod.init();

module.exports = testers_mod;
