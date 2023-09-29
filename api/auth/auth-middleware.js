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

const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username.trim() || !password.trim()) {
      next({ status: 402, message: "username and password required" });
    } else if (!User.getBy({ username: username })) {
      next({ status: 404, message: "invalid credentials" });
    } else next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateNewUser,
  validateUser,
};
