var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
var remote = require('./util/remote');
var toast = require('./util/toast');
var validator = require('./util/validator');
var taber = require('./component/taber/index');

Modal.config = {
  on_close: function() {}
};

function Modal($el, opts) {
  this.$el = $el;
  $.extend(this, Modal.config, opts || {});

  this.bind();
}

Modal.prototype.bind = function() {
  var self = this;

  this.$el.on('click', function(e) {
    if (e.target !== self.$el.get(0)) {
      return;
    }

    e.stopPropagation();

    self.hide();

    self.on_close();
  });
}

Modal.prototype.show = function() {
  this.$el.fadeIn();
}

Modal.prototype.hide = function() {
  this.$el.fadeOut();
}

var my_mod = {
  init: function() {
    new taber({
      active: 'active',
      tabs: '[eid="tab-wrapper"] li',
      contents: '[eid="content-wrapper"] > li'
    });

    this.$modal = $('[eid="vertify-modal"]');

    this.$view_with_code_btns = $('[eid="view-with-code"]');
    this.$code = $('[eid="code"]');
    this.$vertify_btn = $('[eid="vertify-btn"]');
    this.$mobile = $('[eid="mobile"]');

    this.bind_evt();
  },

  bind_evt: function() {
    $(document).on('touchmove', function(e) {
      if ($(e.target).parents('.service-body').length) {
        e.stopPropagation();

        return true;
      }

      e.preventDefault();

      return false;
    });


    var self = this;
    var vertifying = false;

    this.modal = new Modal(this.$modal, {
      on_close: function() {
        vertifying = false;
      }
    });

    this.$view_with_code_btns.on('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      var $target = $(e.target);

      if (vertifying) {
        return false;
      }

      vertifying = true;

      self.mobile = $target.attr('mobile');
      self.redirect_url = $target.attr('href');
      self.$mobile.text(self.mobile);
      self.modal.show();

      remote.postAsJson('/sms/bookingcode', {
        mobile: self.mobile,
        type: 'booking'
      }, function() {
        toast.toggle('验证码发送成功');
        self.$code.focus();
      }, function() {
        toast.toggle('验证码发送失败，请重试');
        vertifying = false;
      });

      return false;
    });

    this.$vertify_btn.on('tap', function() {
      self.view_with_code.apply(self, arguments);
    });
  },

  view_with_code: function(e) {
    if (this.$vertify_btn.prop('disabled')) {
      return;
    }

    var code = this.$code.val();

    if (!validator.code(code)) {
      toast.toggle('验证码格式不正确');

      return;
    }

    this.$vertify_btn.prop('disabled', true);
    this.$vertify_btn.addClass('loading');

    var self = this;

    remote.postAsJson('/wechat/permission_vc', {
      mobile: this.mobile,
      vertify_code: code
    }, function() {
      location.href = self.redirect_url;
    }, function(code, msg) {
      self.$vertify_btn.prop('disabled', false);
      self.$vertify_btn.removeClass('loading');
      toast.toggle('验证失败: ' + msg);
    });
  }
};

my_mod.init();

module.exports = my_mod;