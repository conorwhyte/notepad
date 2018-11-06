import { EventEmitter } from 'events'; 
import dispatcher from '../dispatcher'; 

class AppStore extends EventEmitter {
  constructor() {
    super();

    this.user = 'User'; 
    this.mobile = window.innerWidth <= 760; 
  }

  changeUser(newUser) {
    this.user = newUser; 
    this.emit('changeUser'); 
  }

  getUser() {
    return this.user; 
  }

  changeMobile(flag) {
    this.mobile = flag; 
  }

  getMobile() {
    return this.mobile; 
  }

  handleActions(action) {
    switch(action.type) {
    case 'CHANGE_MOBILE': {
      this.changeMobile(action.text);
      break;
    }
    case 'CHANGE_USER': {
      this.changeUser(action.text);
      break;
    }
    }
  }
}

const appStore = new AppStore; 
dispatcher.register(appStore.handleActions.bind(appStore)); 

export default appStore; 