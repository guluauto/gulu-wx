/**
 * 网页 swf 播放器
 */
var tpl = require('./index.html');

/**
 * 生成播放器
 * @param  {$} $container 播放器插入的容器
 * @param  {string} flash_url swf 文件路径
 * @param  {Object} opts 配置参数
 * @param  {number} opts.width 播放器宽度
 * @param  {number} opts.height 播放器高度
 * @param  {number} opts.scale 播放器宽高比, 高度可以根据宽度计算
 * @function
 */
module.exports = function ($container, flash_url, opts) {
  if (!$container) {
    throw new Error('缺少参数 $container');
  }

  if (!flash_url) {
    throw new Error('缺少参数 flash_url');
  }

  if (opts.scale) {
    opts.height = ~~(opts.width / opts.scale);
  }

  opts.flash_url = flash_url;

  $container.html(tpl.replace(/{{(\w+)}}/g, function(m, p) {
    return opts[p];
  }));
}
