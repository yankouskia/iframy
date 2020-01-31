import { Listener } from './types';

export class Bus {
  private listeners: {
    [key: string]: Listener[],
  } = {};

  on(type: string, listener: Listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }

  once(type: string, listener: Listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    const newListener = (data: any) => {
      listener(data);

      for(let i = 0; i < this.listeners[type].length; i++) {
        if (this.listeners[type][i] === newListener) {
          this.listeners[type].splice(i, 1);
        }
      }
    };

    this.listeners[type].push(newListener);
  }

  off(type: string, listener: Listener) {
    if (!this.listeners[type]) return;

    for(let i = 0; i < this.listeners[type].length; i++) {
      if (this.listeners[type][i] === listener) {
        this.listeners[type].splice(i, 1);
      }
    }
  }

  offAll(type: string) {
    this.listeners[type] = [];
  }

  emit(type: string, data: any) {
    if(this.listeners[type]) {
      this.listeners[type].forEach(l => l(data));
    }
  }
}
