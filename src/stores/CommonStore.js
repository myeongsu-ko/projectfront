import { decorate, observable, action } from 'mobx';

class CommonStore {
  constructor() {
    this.Dim = window.innerWidth / 1000;
    this.Loading = false;
    this.Alert = { visible: false, desc: '' };
    this.Confirm = { visible: false, desc: '', id: '' };
    this.ConfirmFunc = new (function () {})();
    this.Title = '';
  }

  fSetDim = (info) => {
    this.Dim = info;
  };

  fSetLoading = (state) => {
    this.Loading = state;
  };

  fSetAlert = (info) => {
    this.Alert = info;
  };

  fSetConfirm = (info) => {
    this.Confirm = info;
  };

  fSetConfirmFunc = (info) => {
    this.ConfirmFunc = info;
  };

  fSetTitle = (info) => {
    this.Title = info;
  };
}

decorate(CommonStore, {
  Dim: observable,
  Loading: observable,
  Alert: observable,
  Confirm: observable,
  ConfirmFunc: observable,
  Title: observable,
  fSetDim: action,
  fSetState: action,
  fSetAlert: action,
  fSetConfirm: action,
  fSetConfirmFunc: action,
  fSetTitle: action,
});

export default CommonStore;
