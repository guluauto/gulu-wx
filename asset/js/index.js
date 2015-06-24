/* global module, $ */
// var touch = require('../../bower_components/touch.code.baidu.com/touch-0.2.14');
// var remote = require('./util/remote');
// var toast = require('./util/toast');
// var validator = require('./util/validator');
var pager = require('./component/pager/index');
var swiper = require('./component/swiper/index');

var index_mod = {
  init: function() {
    // this.$book_btn = $('[eid="book-btn"]');
    // this.$tel = $('[eid="tel"]');
    // this.$code = $('[eid="code"]');
    // this.$get_code_btn = $('[eid="get-code-btn"]');
    // this.$bookit_btn = $('[eid="bookit-btn"]');

    this.bindEvt();

    new swiper({
      container: '[eid="pg-pic-group-container"]',
      indicators: '.indicators'
    });

    // 翻页效果
    pager('[eid="body"]', '[eid="body-inner"]');
  },

  bindEvt: function() {
    // var self = this;

    $(document).on('touchmove', function(e) {
      e.preventDefault();

      return false;
    });

    // 按钮 - 触发弹出预约框
    // touch.on(this.$book_btn.get(0), 'tap', this.book_mgr.toggle);
    
    // 获取验证码
    // touch.on(this.$get_code_btn.get(0), 'tap', function() {
    //   if ($(this).prop('disabled')) {
    //     return;
    //   }

    //   self.identify.apply(self, arguments);
    // });

    // 立即预约
    // touch.on(this.$bookit_btn.get(0), 'tap', function() {
    //   if ($(this).prop('disabled')) {
    //     return;
    //   }

    //   self.bookit.apply(self, arguments);
    // });
  },

  book_mgr: (function() {
    var $book_mask = $('[eid="book-mask"]');
    var $book_panel = $('[eid="book-panel"]');
    var $book_btn = $('[eid="book-btn"]');
    var ACTIVE_CLASS = 'active';
    var active = false;
    var TIP_CLOSED = '获取验证码立即预约';
    var TIP_OPENED = '关闭';

    return {
      toggle: function() {
        $book_mask[active ? 'removeClass' : 'addClass'](ACTIVE_CLASS);
        $book_panel[active ? 'removeClass' : 'addClass'](ACTIVE_CLASS);

        active = !active;

        $book_btn.text(active ? TIP_OPENED : TIP_CLOSED);
      }
    };
  })()

  // 获取验证码
  // identify: function() {
  //   var tel = this.$tel.val();

  //   if (!this.validate_tel(tel)) {
  //     return;
  //   }

  //   // 发送验证码 loading
  //   this.$get_code_btn.addClass('loading');
  //   this.$get_code_btn.prop('disabled', true);

  //   var self = this;

  //   remote.post('/code', {
  //     mobile: tel
  //   }, function() {
  //     self.$get_code_btn.removeClass('loading');

  //     self.$code.focus();

  //     // 发送成功，则可召唤专业检师
  //     self.$bookit_btn.prop('disabled', false);

  //     self.count_down(60, function(time) {
  //       if (time > 0) {
  //         return self.$get_code_btn.text(time + '秒');
  //       }

  //       // 倒计时结束，可重发验证码
  //       self.$get_code_btn
  //         .prop('disabled', false)
  //         .text('获取验证码');
  //     });
  //   }, function() {
  //     toast.toggle('验证码发送失败，请重试');
  //     // 发送失败，可重发验证码
  //     self.$get_code_btn.removeClass('loading');
  //     self.$get_code_btn.prop('disabled', false);
  //   });
  // },

  // // 立即预约
  // bookit: function() {
  //   var data = this.get_data();

  //   if (!(this.validate_tel(data.mobile) && this.validate_code(data.code))) {
  //     return;
  //   }

  //   // 若验证码计时器还在倒计时，则关闭定时器
  //   if (this.count_down.timer) {
  //     this.count_down.clear();
  //   }

  //   this.$get_code_btn.prop('disabled', true);
  //   this.$bookit_btn.prop('disabled', true);

  //   // TODO
  //   // 提交预约提示

  //   remote.post('/order/wx', data, bookit_success, bookit_error);

  //   var self = this;

  //   function bookit_success(res) {
  //     self.$get_code_btn
  //       .prop('disabled', false)
  //       .text('获取验证码');

  //     self.$bookit_btn.prop('disabled', false);

  //     toast.toggle('预约成功');
  //   }

  //   function bookit_error(code, msg) {
  //     self.$get_code_btn
  //       .prop('disabled', false)
  //       .text('获取验证码');
  //     self.$bookit_btn.prop('disabled', false);

  //     toast.toggle('预约失败，请重试');
  //   }
  // },

  // get_data: function() {
  //   return {
  //     mobile: this.$tel.val(),
  //     code: this.$code.val()
  //   };
  // },

  // validate_tel: function(tel) {
  //   var r = validator.tel(tel);
    
  //   if (!r) {
  //     toast.toggle('手机号不正确');
  //   }

  //   return r;
  // },

  // validate_code: function(code) {
  //   var r = validator.code(code);

  //   if (!r) {
  //     toast.toggle('验证码不正确');
  //   }

  //   return r;
  // },

  // count_down: function(time, fn) {
  //   var self = this;

  //   this.count_down.clear = function() {
  //     clearInterval(self.count_down.timer);

  //     self.count_down.timer = null;
  //   };

  //   fn(--time);

  //   return (this.count_down.timer = setInterval(function(){
  //     if (time > 0) {
  //       return fn(--time);  
  //     }

  //     self.count_down.clear();      
  //   }, 1000));
  // }
};

index_mod.init();

module.exports = index_mod;