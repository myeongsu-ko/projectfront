import { decorate, observable, action } from 'mobx';

class CommonStore {
  constructor() {
    this.Dim = window.innerWidth / 1000;
    this.Loading = false;
    this.Alert = { visible: false, desc: '' };
    this.Confirm = { visible: false, desc: '', id: '' };
    this.ConfirmFunc = new (function () {})();
    this.Popup = { visible: false, desc: '', id: '' };
    this.PopupFunc = new (function () {})();
    this.Title = '';
    this.Orderfirm = { visible: false, desc: '', id: '' };
    this.OrderfirmFunc = new (function () {})();
    this.OrderfirmSearchFunc = new (function () {})();
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

  fSetOrderfirm = (info) => {
    this.Orderfirm = info;
  };

  fSetOrderfirmFunc = (info) => {
    this.OrderfirmFunc = info;
  };

  fSetOrderfirmSearchFunc = (info) => {
    this.OrderfirmSearchFunm = info;
  };
}

decorate(CommonStore, {
  Dim: observable,
  Loading: observable,
  Alert: observable,
  Confirm: observable,
  ConfirmFunc: observable,
  Orderfirm: observable,
  OrderfirmFunc: observable,
  OrderfirmSearchFunc: observable,
  Title: observable,
  fSetDim: action,
  fSetState: action,
  fSetAlert: action,
  fSetConfirm: action,
  fSetConfirmFunc: action,
  fSetTitle: action,
  fSetOrderfirm: action,
  fSetOrderfirmFunc: action,
  fSetOrderfirmSearchFunc: action,
});

export default CommonStore;
