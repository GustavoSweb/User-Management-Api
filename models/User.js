const database = require("../database/connection");
const { NotValid } = require("../utils/Error");
const bcrypt = require("bcrypt");

class User {
  async findOne(OneDate) {
    if (!OneDate) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(OneDate)
    try {
      const data = await database
        .select()
        .table("users")
        .where(`${key[0]}`, OneDate[key[0]]);
      if (data) return data[0];
      return undefined
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  async findById(id){
    if (!id) throw new Error("Falta de parametros no findByPk");
    try {
      const data = await database
        .select(['id', 'name', 'email', 'role'])
        .table("users")
        .where({id});
      return data[0];
    } catch (err) {
      console.error(err);
      return {};
    }
  }
  async findAll() {
    try {
      const data = await database
        .select(["id", "name", "email", "role"])
        .table("users");
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async create({ name, role, email, password }) {
    try {
      var hash = await bcrypt.hash(password, 10);

      await database
        .insert({ name, role, email, password: hash })
        .into("users");
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new User();
