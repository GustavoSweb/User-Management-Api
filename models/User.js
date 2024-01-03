const database = require("../database/connection");
const { NotValid, ExistValue } = require("../utils/Error");
const bcrypt = require("bcrypt");

class User {
  async delete({ id }) {
    try {
      const value = await database.where({ id }).delete().table("users");
      if (value == 0)
        throw new ExistValue("O usuario a ser deletado não existe");
    } catch (err) {
      throw err;
    }
  }
  async findOne(OneDate) {
    if (!OneDate) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(OneDate);
    try {
      const data = await database
        .select()
        .table("users")
        .where(`${key[0]}`, OneDate[key[0]]);
      if (data) return data[0];
      return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  async updateProcessEdit(data, user) {
    try {
      if (user.email != data.email && data.email) {
        var emailRegister = await this.findOne({ email: data.email });
        if (emailRegister) throw new ExistValue("O e-mail ja esta registrado");
      } else delete data.email;
      if (!data.role || data.role == user.name) delete data.role;
      if (!data.name || data.name == user.name) delete data.name;
      if (Object.keys(data).length <= 0)
        throw new NotValid("Não houve nenhuma modificação");
      return data;
    } catch (err) {
      throw err
    }
  }
  async update({ data, id }) {
    try {
      const user = await this.findById(id);
      if (!user) throw new ExistValue("Usuario não encontrado");
      const userEdit = await this.updateProcessEdit(data, user);
      return await database.update(userEdit).where({ id }).table("users");
    } catch (err) {
      throw err
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findByPk");
    try {
      const data = await database
        .select(["id", "name", "email", "role"])
        .table("users")
        .where({ id });
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
