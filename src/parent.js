import { CALL_API, REGISTER_API_TYPE, EVENT_FIRING_TYPE, CALL_API_RESULT } from './shared';
import { encodeProps } from './helpers';
import { createMessage, parseMessage } from './parent-helpers';

class IFramy {
  constructor({
    id,
    url,
    dimensions = {},
    props = {},
  }) {
    this.API = {};
    this.id = id;
    this.url = url;
    this.props = props;

    this.listeners = {};
    this.apiListeners = {};
    this.listen();

    this.dimensions = {
      height: dimensions.height || 'auto',
      width: dimensions.width || 'auto',
    };

    let qprops;
    try {
      qprops = encodeProps({ ...props, id });
    } catch(e) {
      throw new Error('Props cannot contain circular data');
    }

    this.frame = document.createElement('iframe');
    this.frame.setAttribute('src', `${url}${qprops}`);
    this.frame.setAttribute('width', dimensions.width);
    this.frame.setAttribute('height', dimensions.height);
  }

  render(selector) {
    const element = document.querySelector(selector);

    if (!element) throw new Error('Parent element does not exist');

    element.appendChild(this.frame);
    return this;
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
      type: EVENT_FIRING_TYPE,
      data,
      name: event,
    });

    this.sendMessage(evt);
  }

  sendMessage(event) {
    this.frame.contentWindow.postMessage(event, '*');
  }

  registerApi({ name }) {
    this.API[name] = data => {
      const resultPromise = new Promise(resolve => {
        this.apiListeners[name] = resolve;
      });

      const message = createMessage({
        type: CALL_API,
        name,
        data,
      });

      this.sendMessage(message);

      return resultPromise;
    };
  }

  callEvent({ name, data }) {
    if (!this.listeners[name]) return;

    this.listeners[name].forEach(cb => cb(data));
  }

  callApi({ name, data }) {
    if (!this.apiListeners[name]) return;

    this.apiListeners[name](data);
    this.apiListeners[name] = undefined;
  }

  listen() {
    window.addEventListener('message', event => {
      const evt = parseMessage(event.data);

      if (evt.id !== this.id ) {
        return;
      }

      if (evt.type === EVENT_FIRING_TYPE) {
        return this.callEvent({
          name: evt.name,
          data: evt.data,
        });
      }

      if (evt.type === REGISTER_API_TYPE) {
        return this.registerApi({
          name: evt.name,
        });
      }

      if (evt.type === CALL_API_RESULT) {
        return this.callApi({
          name: evt.name,
          data: evt.data,
        });
      }
    });
  }
}

export function create({
  dimensions,
  id,
  props,
  url,
}) {
  return new IFramy({
    dimensions,
    id,
    props,
    url,
  });
};
