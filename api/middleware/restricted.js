const { JWT_SECRET } = require("../secrets/index");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // eslint-disable-next-line no-unused-vars
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "token invalid" });
      } else {
        next();
      }
    });
  } else {
    next({ status: 403, message: "token required" });
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
