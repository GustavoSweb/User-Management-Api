function NotValid(message) {
  this.message = message;
  this.name = "NotValid";
}
function ExistValue(message) {
  this.message = message;
  this.name = "ExistValue";
}
module.exports = { NotValid, ExistValue };
