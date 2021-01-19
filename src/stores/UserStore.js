import { decorate, observable, action } from 'mobx';

class UserStore {
  constructor() {
    this.user = {
      userid: '',
      username: '',
    };
    this.storekey = '';
  }

  fSetUser = (info) => {
    this.user = info;
  };

  fClearUser = () => {
    this.user = {
      userid: '',
      username: '',
    };
  };

  fSetKey = (info) => {
    this.storekey = info;
  };
}

decorate(UserStore, {
  user: observable,
  fSetUser: action,
  fClearUser: action,
  fSetKey: action,
});

export default UserStore;
