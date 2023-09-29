const db = require("../../data/dbConfig");

function getById(id) {
  return db("users").where("id", id).first();
}

async function getBy(filter) {
  const user = await db("users").where(filter);
  return user;
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
