import { makeAutoObservable } from 'mobx';

import { authentication } from '@/modules/LR/authentication';

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
    if (!authentication.isAuthenticated) {
      this.isLROpen = true;
      return;
    }
    this.isLROpen = status;
  }
}

export const globalStore = new GlobalStore();
