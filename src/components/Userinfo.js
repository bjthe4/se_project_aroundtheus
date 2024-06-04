export default class UserInfo {
  constructor(name, job) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }
  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
