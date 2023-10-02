const User = require("../users/users-model");
const bcrypt = require("bcryptjs");

const validateNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username.length < 1 || password.length < 1) {
      next({ status: 402, message: "username and password required" });
    } else if (username.trim().length < 1 || password.trim().length < 1) {
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
    if (username.trim().length < 1 || password.trim().length < 1) {
      next({ status: 402, message: "username and password required" });
    } else {
      const [user] = await User.getBy({ username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        next({ status: 422, message: "invalid credentials" });
      } else {
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
