const {NotValid} = require('./Error')
const names = {
  name: "Nome",
  email: "Email",

  password: "Senha",
};

class Validation {
  constructor(data, optional) {
    this.data = data;
    this.optional = optional;
    this.inputs = {
      email: this.EmailFormat.bind(this),
    };
  }

  EmailFormat() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(this.data.email))
      throw new NotValid(`Formato de email inválido`);
  }
  Check() {
    var msg;
    Object.keys(this.data).forEach((input) => {
      const option = this.optional
        ? this.optional.find((a) => a == input)
        : null;
      if (this.data[input] == undefined && option == null) {
        msg =`O ${input} é invalido`
        throw new NotValid(msg);
      } else if (this.inputs[input] != undefined && option == null)
        this.inputs[input]();
    });
  }
}

module.exports = Validation;
