var Remote = {}

module.exports = Remote;

var csrfmiddlewaretoken = $('#csrfmiddlewaretoken').val();

var noop = function() {};
var _ajax = $.ajax;
$.ajax = function(options) {
  var success = options.success || noop;
  var error = options.error || noop;

  options.success = function(res) {
    var msg = res.msg || res.message;

    if (res.code != null && res.code != 200) {
      error(res.code, msg);
      return;
    }

    success(res);
  }

  if (['POST', 'DELETE', 'PUT'].indexOf(options.type) !== -1 && $.isPlainObject(options.data)) {
    options.data.csrfmiddlewaretoken = csrfmiddlewaretoken;
    options.headers = { 'X-CSRFToken': csrfmiddlewaretoken };
  }

  _ajax(options);
}

Remote.get = function (url, data, success, error) {
  return $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    data: data,
    success: success,
    error: error
  });
};

Remote.post = function (url, data, success, error) {
  return $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: data,
    success: success,
    error: error
  });
};

Remote.delete = function (url, data, success, error) {
  return $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'json',
    data: data,
    success: success,
    error: error
  });
};

Remote.update = function (url, data, success, error) {
  return $.ajax({
    url: url,
    type: 'UPDATE',
    dataType: 'json',
    data: data,
    success: success,
    error: error
  });
};