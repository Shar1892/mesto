export class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.nameSelector);
    this._activity = document.querySelector(selectors.activitySelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      activity: this._activity.textContent
    }

    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.activity;
  }
}