const db = require("../../data/dbConfig");

function getById(id) {
  return db("users").where("id", id).first();
}

function getBy(filter) {
  return db("users").where(filter);
}

const add = async (user) => {
  const [id] = await db("users").insert(user);
  const newUser = getById(id);
  return newUser;
};

module.exports = {
  getById,
  getBy,
  add,
};
