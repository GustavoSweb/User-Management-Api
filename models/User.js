const database = require("../database/connection");
const { NotValid } = require("../utils/Error");
const bcrypt = require("bcrypt");

class User {
  async findOne(OneDate) {
    if (!OneDate) throw new Error("Falta de parametros no findOne");
    var check = OneDate.id ? "id" : "email";
    if (!OneDate.email) throw new NotValid("O e-mail é invalido");
    try {
      const data = await database
        .select()
        .table("users")
        .where(`${check}`, OneDate[check]);
      return data;
    } catch (err) {
      return false;
    }
  }
  async findAll() {
    try {
      const data = await database
        .select(["id", "name", "email", "role"])
        .table("users");
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async create({ name, role, email, password }) {
    try {
      const user = await User.findOne({ email });
      if (user[0])
        return res.status(409).json({ err: "Usuario ja cadastrado" });
      var hash = await bcrypt.hash(password, 10);

      await database
        .insert({ name, role, email, password: hash })
        .into("users");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new User();
