exports.post = function(req, res) {
  setTimeout(function() {
    res.status(500).json({
      code: 200,
      msg: 'OK'
    });

  }, 2000);
}
