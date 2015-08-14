require('./index.less');

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

  if (!this.closable) {
    return;
  }

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

module.exports = Modal;