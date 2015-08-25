var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
var remote = require('./util/remote');
var toast = require('./component/toastr/');
var validator = require('./util/validator');
var taber = require('./component/taber/');
var Modal = require('./component/modal/');
var callus = require('./biz/callus/');

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
    this.$verify_btn = $('[eid="vertify-btn"]');
    this.$mobile = $('[eid="mobile"]');
    this.$cancel_btn = $('[eid="cancel-btn"]');

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

    this.modal = new Modal(this.$modal, {
      on_close: function() {
        self.vertifying = false;
      }
    });

    this.$view_with_code_btns.on('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      var $target = $(e.target);
      self.mobile = $target.attr('mobile');

      if (self.vertifying) {
        return false;
      }

      if (!confirm('报告属于' + self.mobile + ', 确认发送验证码查看?')) {
        return false;
      }

      self.vertifying = true;

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
        callus.show();
        // toast.toggle('验证码发送失败，请重试');
        self.vertifying = false;
      });

      return false;
    });

    this.$verify_btn.on('tap', function() {
      self.view_with_code.apply(self, arguments);

      return false;
    });

    this.$cancel_btn.on('tap', function() {
      self.modal.hide();
      return false;
    });
  },

  view_with_code: function(e) {
    if (this.$verify_btn.prop('disabled')) {
      return;
    }

    var code = this.$code.val();

    if (!validator.code(code)) {
      toast.toggle('验证码格式不正确');

      return;
    }

    this.$verify_btn.prop('disabled', true);
    this.$verify_btn.addClass('loading');

    var self = this;

    remote.post('/wechat/permission_vc', {
      mobile: this.mobile,
      verify_code: code
    }, function() {
      self.$verify_btn.prop('disabled', false);
      self.$verify_btn.removeClass('loading');
      self.modal.hide();

      location.href = self.redirect_url;
    }, function(code, msg) {
      self.$verify_btn.prop('disabled', false);
      self.$verify_btn.removeClass('loading');

      toast.toggle('验证失败: ' + msg);
    });
  }
};

my_mod.init();

module.exports = my_mod;
