import { makeAutoObservable } from 'mobx';

const AUTH_TOKEN_KEY = 'authenticationToken';

class GlobalStore {
  isLROpen: boolean = false;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        this.setLROpen(true);
      }
    }
  }

  setLROpen(status: boolean) {
    this.isLROpen = status;
  }
}

export const globalStore = new GlobalStore();
