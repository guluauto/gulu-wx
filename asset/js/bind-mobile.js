var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
var pager = require('./component/pager/');
var remote = require('./util/remote');
var validator = require('./util/validator');
var toast = require('./component/toastr/');
var callus = require('./biz/callus/');

var bind_mobile_mod = {
  init: function() {
    this.$tel = $('[eid="tel"]');
    this.$code = $('[eid="code"]');
    this.$get_code_btn = $('[eid="get-code-btn"]');
    this.$bind_btn = $('[eid="bind-btn"]');
    this.$bind_form = $('[eid="bind-form"]');

    pager('[eid="page"]', '[eid="wrapper"]');

    this.bind_evt();
  },

  bind_evt: function() {
    var self = this;

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });

    // 获取验证码
    touch.on(this.$get_code_btn.get(0), 'tap', function(e) {
      if ($(this).prop('disabled')) {
        return false;
      }

      return self.identify.apply(self, arguments);
    });

    this.$bind_form.on('submit', function(e) {
      if ($(this).prop('disabled')) {
        return false;
      }

      return self.bind_mobile.apply(self, arguments);
    });
  },

  // 获取验证码
  identify: function() {
    var tel = this.$tel.val();

    if (!this.validate_tel(tel)) {
      return false;
    }

    // 发送验证码 loading
    this.$get_code_btn.addClass('loading');
    this.$get_code_btn.prop('disabled', true);

    var self = this;

    var xhr = remote.postAsJson('/sms/bookingcode', {
      mobile: tel,
      type: 'booking'
    }, function() {
      self.$get_code_btn.removeClass('loading');

      self.$code.focus();

      // 发送成功，则可召唤专业检师
      self.$bind_btn.prop('disabled', false);

      self.count_down(60, function(time) {
        if (time > 0) {
          return self.$get_code_btn.text(time + '秒');
        }

        // 倒计时结束，可重发验证码
        self.$get_code_btn
          .prop('disabled', false)
          .text('获取验证码');
      });
    }, function(xhr) {
      callus.show();
      // toast.toggle('获取验证码失败，请拨打下方 400 电话绑定');
      // 发送失败，可重发验证码
      self.$get_code_btn.removeClass('loading');
      self.$get_code_btn.prop('disabled', false);
    });

    return false;
  },

  // 提交绑定
  bind_mobile: function() {
    var data = this.get_data();

    if (!(this.validate_tel(data.mobile) && this.validate_code(data.code))) {
      return false;
    }

    // 若验证码计时器还在倒计时，则关闭定时器
    if (this.count_down.timer) {
      this.count_down.clear();
    }

    this.$get_code_btn.prop('disabled', true);
    this.$bind_btn.prop('disabled', true);

    return true;
  },

  get_data: function() {
    return {
      mobile: this.$tel.val(),
      code: this.$code.val()
    };
  },

  clear_field: function() {
    this.$tel.val('');
    this.$code.val('');
  },

  validate_tel: function(tel) {
    var r = validator.tel(tel);

    if (!r) {
      toast.toggle('手机号不正确');
    }

    return r;
  },

  validate_code: function(code) {
    var r = validator.code(code);

    if (!r) {
      toast.toggle('验证码不正确');
    }

    return r;
  },

  count_down: function(time, fn) {
    var self = this;

    this.count_down.clear = function() {
      clearInterval(self.count_down.timer);

      self.count_down.timer = null;
    };

    fn(--time);

    return (this.count_down.timer = setInterval(function(){
      if (time > 0) {
        return fn(--time);
      }

      self.count_down.clear();
    }, 1000));
  }
};

bind_mobile_mod.init();

module.exports = bind_mobile_mod;
