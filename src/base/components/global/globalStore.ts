import { makeAutoObservable } from 'mobx';

class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const globalStore = new GlobalStore();
