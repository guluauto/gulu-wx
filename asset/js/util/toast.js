require('./toast.less');

var $toast = $('<div class="toast hide"></div>').appendTo(document.body);

module.exports = {
  show: function (txt) {
    $toast.text(txt);
    $toast.removeClass('hide');
  },

  hide: function () {
    $toast.addClass('hide');
  },

  toggle: function (txt, time, callback) {
    $toast.text(txt).removeClass('hide');

    setTimeout(function () {
      $toast.addClass('hide');

      callback && callback();
    }, time || 2000);
  }
}
