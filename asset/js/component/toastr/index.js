require('./index.less');

var $toast = $('<div class="toast hide"></div>').appendTo(document.body);

var toastr = {
  visible: true,

  show: function (txt) {
    $toast.text(txt);
    $toast.removeClass('hide');
    toastr.visible = false;

    $toast.one('click', toastr.hide);
  },

  hide: function () {
    $toast.addClass('hide');
    toastr.visible = true;
  },

  toggle: function (txt, time, callback) {
    toastr.show(txt);

    setTimeout(function () {
      if (!toastr.visible) {
        toastr.hide();
      }

      $toast.off('click', toastr.hide);

      callback && callback();
    }, time || 2000);
  }
};

module.exports = toastr;
