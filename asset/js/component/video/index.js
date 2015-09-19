var tpl = require('./index.html');
var RE_TPL = /{{(\w+)}}/g;

function Video(opts) {
  if (opts.container) {
    this.$container = container;
  }

  if (opts.scale) {
    opts.height = ~~(opts.width / opts.scale);
  }

  this.html = tpl.replace(RE_TPL, function(m, p) {
    return opts[p] || '';
  });

  if (opts.autoshow && this.$container) {
    this.show();
  }
}

Video.prototype.show = function() {
  this.$container.html(this.html);
}

module.exports = Video;
