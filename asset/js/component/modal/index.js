/**
 * @file Modal 组件
 * @author Kane yunhua.xiao@guluauto.com
 * @TODO 规范化 Modal Container
 * @TODO 将 Modal 内容设计为模板传入
 * @TODO 增加 on_show 回调
 */

require('./index.less');

Modal.config = {
  on_close: function() {}
};

/**
 * Modal 构造函数
 * @example
 *
 * var modal = new Modal($el, {
 * 		on_close: Function,
 * 		on_show: Function,
 * 		closable: boolean
 * });
 *
 * // 打开 modal
 * modal.show();
 *
 * // 关闭 modal
 * modal.hide();
 *
 * @param {DOMElement} $el  modal dom element
 * @param {Object} opts 配置参数
 * @param {Function} opts.on_close
 * @param {Function} opts.on_show
 * @param {boolean} opts.closable 是否点击 Modal 背景关闭 Modal
 * @constructor
 */
function Modal($el, opts) {
  this.$el = $el;
  $.extend(this, Modal.config, opts || {});

  this.bind();
}

/**
 * 设置点击 Modal 背景关闭 Modal 事件
 * @method bind
 * @access private
 */
Modal.prototype.bind = function() {
  var self = this;

  if (!this.closable) {
    return;
  }

  this.$el.on('click', function(e) {
    if (e.target !== self.$el.get(0)) {
      return;
    }

    e.stopPropagation();

    self.hide();
  });
}

/**
 * 打开 Modal
 * @method show
 */
Modal.prototype.show = function() {
  this.$el.fadeIn();
}

/**
 * 关闭 Modal
 * @method hide
 */
Modal.prototype.hide = function() {
  this.$el.fadeOut();

  this.on_close();
}

/**
 * Modal 组件
 * @module component/Modal
 * @type {Modal}
 */
module.exports = Modal;
