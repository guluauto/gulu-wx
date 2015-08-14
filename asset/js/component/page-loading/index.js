var Modal = require('../modal/');
var tpl = require('./index.html');

require('./index.less');

var $el = $(tpl).appendTo(document.body);
var modal = new Modal($el, {
  closable: false
});

var page_loading = {
  show: modal.show.bind(modal),
  hide: modal.hide.bind(modal)
}

module.exports = page_loading;