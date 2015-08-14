var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
var pager = require('./component/pager/index');
var remote = require('./util/remote');
var toast = require('./util/toast');
var validator = require('./util/validator');

var reserve_mod = {
  init: function() {
    this.$tel = $('[eid="tel"]');
    this.$code = $('[eid="code"]');
    this.$get_code_btn = $('[eid="get-code-btn"]');
    this.$bookit_btn = $('[eid="bookit-btn"]');
    this.$bookit_form = $('[eid="bookit-form"]');

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
    touch.on(this.$get_code_btn.get(0), 'tap', function() {
      if ($(this).prop('disabled')) {
        return;
      }

      self.identify.apply(self, arguments);
    });

    // 立即预约
    this.$bookit_form.on('submit', function() {
      if (self.$bookit_btn.prop('disabled')) {
        return false;
      }

      self.bookit.apply(self, arguments);

      return false;
    });
  },

  // 获取验证码
  identify: function() {
    var tel = this.$tel.val();

    if (!this.validate_tel(tel)) {
      return;
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
      self.$bookit_btn.prop('disabled', false);

      self.count_down(60, function(time) {
        if (time > 0) {
          return self.$get_code_btn.text(time + '秒');
        }

        // 倒计时结束，可重发验证码
        self.$get_code_btn
          .prop('disabled', false)
          .text('获取验证码');
      });
    }, function() {
      toast.toggle('验证码发送失败，请重试');
      // 发送失败，可重发验证码
      self.$get_code_btn.removeClass('loading');
      self.$get_code_btn.prop('disabled', false);
    });
  },

  // 立即预约
  bookit: function() {
    var data = this.get_data();

    if (!(this.validate_tel(data.mobile) && this.validate_code(data.code))) {
      return;
    }

    // 若验证码计时器还在倒计时，则关闭定时器
    if (this.count_down.timer) {
      this.count_down.clear();
    }

    this.$get_code_btn.prop('disabled', true);
    this.$bookit_btn.prop('disabled', true);

    // TODO
    // 提交预约提示
    remote.postAsJson('/order', {
      order_through: 0,
      requester_mobile: data.mobile,
      code: data.code
    }, bookit_success, bookit_error);

    var self = this;

    function bookit_success(res) {
      self.$get_code_btn
        .prop('disabled', false)
        .text('获取验证码');

      self.$bookit_btn.prop('disabled', false);
      self.clear_field();

      toast.toggle('预约成功，5分钟内我们联系您', 5000);
    }

    function bookit_error(code, msg) {
      self.$get_code_btn
        .prop('disabled', false)
        .text('获取验证码');
      self.$bookit_btn.prop('disabled', false);

      toast.toggle('预约失败，请重试');
    }
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

reserve_mod.init();

module.exports = reserve_mod;