export class UserInfo {


  constructor(selectors, api) {
    this._name = document.querySelector(selectors.nameSelector);
    this._activity = document.querySelector(selectors.activitySelector);
    this._avatar = document.querySelector(selectors.avatarSelector);
    this._api = api;
  }

  

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._activity.textContent,
      avatar: this._avatar.src
    }

    return userData;
  }

  showUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.about;
    this._avatar.src = data.avatar;
    this.id = data._id;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

}