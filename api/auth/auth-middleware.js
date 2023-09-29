const User = require("../users/users-model");

const validateNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username.trim() || !password.trim()) {
      next({ status: 402, message: "username and password required" });
    } else {
      const newUser = await User.getBy({ username });
      if (newUser.length !== 0) {
        next({ status: 400, message: "username taken" });
      } else next();
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username.trim() || !password.trim()) {
      next({ status: 402, message: "username and password required" });
    } else {
      const [user] = await User.getBy({ username });
      if (user.length === 0) {
        next({ status: 422, message: "invalid credentials" });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateNewUser,
  validateUser,
};
