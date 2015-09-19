var Video = require('./component/video/');
var art = require('../../bower_components/artTemplate/dist/template');
var video_item_tpl = require('./video-item-tpl.html');
var video_render = art.compile(video_item_tpl);

var video_data = [
  {
    title: 'MINI',
    address: '西安三桥二手车市场',
    vid: 's0166uacz6u'
  }, {
    title: '奥迪',
    address: '西安三桥二手车市场',
    vid: 'z01665w3yuw'
  }, {
    title: '捷豹',
    address: '西安丰宝源二手车',
    vid: 'c016608922s'
  }, {
    title: '思域',
    address: '西安三桥二手车市场',
    vid: 'v0166o8y8h1'
  }
];

var cm_mod = {
  init: function() {
    var $container = $('[eid="comment-list"]');

    video_data.forEach(function(item) {
      var video = new Video({
        vid: item.vid,
        width: $container.width() - 52,
        scale: 510 / 498
      });

      item.video_iframe = video.html;
    });

    var html = video_render({
      videos: video_data
    });

    $container.html(html);
  }
};

cm_mod.init();

module.exports = cm_mod;
