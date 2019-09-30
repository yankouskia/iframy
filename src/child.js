import { CALL_API, CALL_API_RESULT, REGISTER_API_TYPE, EVENT_FIRING_TYPE } from './shared';
import { extractProps, createMessage, parseMessage } from './child-helpers';

class IFramyChild {
  constructor() {
    const { id, ...props } = extractProps();

    this.props = props;
    this.id = id;
    this.api = {};

    this.apiListeners = {};
    this.listeners = {};
    this.listen();
  }

  on(event, listener) {
    if (typeof event !== 'string' || typeof listener !== 'function') {
      throw new Error('Event name should be string; listener should function');
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event, data) {
    const evt = createMessage({
      id: this.id,
      type: EVENT_FIRING_TYPE,
      data,
      name: event,
    });

    this.sendMessage(evt);
  }

  sendMessage(event) {
    window.parent.postMessage(event, '*');
  }

  listen() {
    window.addEventListener('message', event => {
      const evt = parseMessage(event.data);

      if (evt.type === EVENT_FIRING_TYPE) {
        return this.callEvent({
          name: evt.name,
          data: evt.data,
        });
      }

      if (evt.type === CALL_API) {
        return this.callApi({
          name: evt.name,
          data: evt.data,
        });
      }
    });
  }

  callApi({ name, data }) {
    if (!this.apiListeners[name]) return;

    const result = this.apiListeners[name](data);
    const msg = createMessage({
      id: this.id,
      type: CALL_API_RESULT,
      data: result,
      name,
    });

    this.sendMessage(msg);
  }

  callEvent({ name, data }) {
    if (!this.listeners[name]) return;

    this.listeners[name].forEach(cb => cb(data));
  }

  exposeAPI(name, fn) {
    const msg = createMessage({
      id: this.id,
      type: REGISTER_API_TYPE,
      name,
    });

    this.sendMessage(msg);
    this.apiListeners[name] = fn;
  }
}

export function isChild() {
  return window.parent !== window;
}

export function isInitialized() {
  return window.iframy instanceof IFramyChild;
}

export function init() {
  window.iframy = new IFramyChild();
  return window.iframy;
}

export function instance() {
  return window.iframy;
}
