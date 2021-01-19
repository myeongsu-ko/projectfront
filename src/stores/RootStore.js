import UserStore from '@stores/UserStore';
import RoutesStore from '@stores/RouteStore';
import CommonStore from '@stores/CommonStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.routeStore = new RoutesStore(this);
    this.commonStore = new CommonStore(this);
  }
}

export default RootStore;
