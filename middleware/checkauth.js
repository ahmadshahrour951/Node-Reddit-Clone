var jwt = require('jsonwebtoken');

module.exports = function () {
  return function (req, res, next) {
    console.log('Checking authentication');
    if (
      typeof req.cookies.nToken === 'undefined' ||
      req.cookies.nToken === null
    ) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }

    next();
  };
};
