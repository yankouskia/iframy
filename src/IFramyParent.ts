import 'regenerator-runtime/runtime';
import { parseMessage, createMessage } from './helpers';
import { IFRAMY_ID_KEY, INIT_EVENT_TYPE_RESPONSE, INIT_EVENT_TYPE_REQUEST, EMIT_PARENT_TO_CHILD_EVENT, EMIT_CHILD_TO_PARENT_EVENT, CALL_API_REQUEST_EVENT, CALL_API_RESPONSE_EVENT } from './constants';
import { MessageData, Listener } from './types';
import { Bus } from './Bus';
import { COERCING_ERROR } from './error-types';

type Dimensions = {
  width?: string,
  height?: string,
};

type InitData = {
  dimensions?: Dimensions,
  props?: any,
  scrolling?: boolean,
  url: string,
};

export class IFramyParent {
  private internalBus = new Bus();
  private listenersBus = new Bus();
  private dimensions: Dimensions;
  private props: any;
  private scrolling: boolean;
  private url: string;
  private frame: HTMLIFrameElement;
  private uid: string;
  public API: {
    [key: string]: Listener,
  } = {};

  private constructor(data: InitData) {
    const {
      dimensions = {},
      props = {},
      scrolling = false,
      url,
    } = data;

    this.dimensions = dimensions;
    this.props = props;
    this.scrolling = scrolling;
    this.url = url;

    this.uid = this.generateID();

    this.frame = document.createElement('iframe');
    this.frame.setAttribute('src', `${this.url}?${IFRAMY_ID_KEY}=${this.uid}`);
    this.dimensions.width && this.frame.setAttribute('width', this.dimensions.width);
    this.dimensions.height && this.frame.setAttribute('height', this.dimensions.height);
    this.frame.setAttribute('scrolling', this.scrolling ? 'yes' : 'no');

    this.globalListener = this.globalListener.bind(this);
    window.addEventListener('message', this.globalListener);
  }

  private generateID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private async waitForMessage(type: string, id?: string): Promise<MessageData> {
    return new Promise(resolve => {
      const resolver = (data: any) => {
        const { id: responseID, uid } = data;
        if (uid !== this.uid) return;
        if (id && id !== responseID) return;

        this.internalBus.off(type, resolver);
        return resolve(data);
      };

      this.internalBus.on(type, resolver);
    });
  }

  private globalListener(event: MessageEvent) {
    let messageData: MessageData;

    try {
      messageData = parseMessage(event.data);
    } catch (e) {
      console.warn('Message received, but was not parsed');
      return;
    }

    const {
      id,
      data,
      name,
      type,
      uid,
    } = messageData;

    if(uid !== this.uid) return;

    this.internalBus.emit(type, {
      id,
      data,
      name,
      type,
      uid,
    });

    if (type === EMIT_CHILD_TO_PARENT_EVENT) {
      this.listenersBus.emit(name, data);
    }
  }

  private sendMessage({
    id,
    data,
    name,
    type,
  }: MessageData) {
    let msg: string;

    try {
      msg = createMessage({
        id,
        data,
        name,
        type,
      });
    } catch (e) {
      msg = createMessage({
        id,
        meta: {
          errorType: COERCING_ERROR,
        },
        name,
        type,
      });
    }

    this.frame.contentWindow.postMessage(msg, '*');
  }

  private exposeApi(apiNames: string[]) {
    for (let i = 0; i < apiNames.length; i++) {
      const name = apiNames[i];
      const id = this.generateID();

      const fn = async (data: any) => {
        this.sendMessage({
          data,
          id,
          name,
          type: CALL_API_REQUEST_EVENT,
        });

        const { data: response } = await this.waitForMessage(CALL_API_RESPONSE_EVENT, id);
        return response;
      };

      this.API[name] = fn;
    }
  }

  public static create(data: InitData) {
    return new IFramyParent(data);
  }

  public async render(selector: string|HTMLElement) {
    let element: HTMLElement;

    if (selector instanceof HTMLElement) {
      element = selector;
    } else {
      element = document.querySelector<any>(selector);
    }

    if (!element) throw new Error('Parent element does not exist');

    element.appendChild(this.frame);

    await new Promise(loadResolve => {
      const handler = () => {
        this.frame.removeEventListener('load', handler);
        loadResolve();
      };

      this.frame.addEventListener('load', handler);
    });

    this.sendMessage({
      data: { props: this.props },
      type: INIT_EVENT_TYPE_REQUEST,
    });

    const { data } = await this.waitForMessage(INIT_EVENT_TYPE_RESPONSE);
    this.exposeApi(data);

    return this;
  }

  public addListener(type: string, listener: Listener) {
    this.listenersBus.on(type, listener);
  }

  public addListenerOnce(type: string, listener: Listener) {
    this.listenersBus.once(type, listener);
  }

  public removeListener(type: string, listener: Listener) {
    this.listenersBus.off(type, listener);
  }

  public removeAllListeners(type: string) {
    this.listenersBus.offAll(type);
  }

  public on = this.addListener.bind(this);
  public once = this.addListenerOnce.bind(this);
  public off = this.removeListener.bind(this);
  public offAll = this.removeAllListeners.bind(this);

  public emit(type: string, data: any) {
    this.sendMessage({
      data,
      name: type,
      type: EMIT_PARENT_TO_CHILD_EVENT,
    });
  }
}
