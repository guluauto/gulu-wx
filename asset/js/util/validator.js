module.exports = {
  // 验证手机号
  tel: function(s) {
    var reg = /1\d{10}/g;

    return reg.test(s);
  },

  code: function(s) {
    return s.length === 4;
  }
}