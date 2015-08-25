require('./index.less');

var Modal = require('../../component/modal/');
var modal_tpl = require('./index.html');
var $modal = $(modal_tpl).appendTo(document.body);

var callus = new Modal($modal, {
  closable: true
});

module.exports = callus;
