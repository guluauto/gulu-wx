exports.post = function(req, res) {
  setTimeout(function () {
    res.status(200).json({
      code: 200,
      msg: 'OK'
    });
  }, 1000);
}