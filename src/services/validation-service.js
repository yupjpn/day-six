module.exports = class AuthService {
    constructor() {}
  
    isValidRegisterBody(user) {
      if (!user.name || !user.surname) {
        return false;
      }
      if (!this.isValidEmailAddress(user.email)) {
        return false;
      }
      if (!this.isValidPassword(user.password)) {
        return false;
      }
  
      return true;
    }
  
    isValidEmailAddress(email) {
      const regex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return regex.test(email.toLowerCase());
    }
  
    isValidPassword(password) {
      const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/);
      return regex.test(password);
    }
  };