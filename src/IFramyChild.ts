import 'regenerator-runtime/runtime';
import { parseMessage, createMessage } from './helpers';
import { INIT_EVENT_TYPE_REQUEST, IFRAMY_ID_KEY, INIT_EVENT_TYPE_RESPONSE, EMIT_CHILD_TO_PARENT_EVENT, EMIT_PARENT_TO_CHILD_EVENT, CALL_API_REQUEST_EVENT, CALL_API_RESPONSE_EVENT } from './constants';
import { MessageData, Listener } from './types';
import { COERCING_ERROR } from './error-types';
import { Bus } from './Bus';

type ApiListenersType = {
  [key: string]: (data?: any) => any,
};

type InitData = {
  api?: ApiListenersType,
};

const extractID = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get(IFRAMY_ID_KEY);

  if (!id) throw new Error('Please recheck configuration. Child iframe should be opened automatically, no query params should be changed / removed manually');
  return id;
}

export class IFramyChild {
  private listenersBus = new Bus();
  private firstMessageData = {
    isReceived: false,
    id: '',
  };
  private api: ApiListenersType;
  private uid: string;

  public props: any;

  private constructor(data: InitData = {}) {
    this.globalListener = this.globalListener.bind(this);
    this.uid = extractID();
    this.api = data.api || {};

    window.addEventListener('message', this.globalListener);
  }

  private async globalListener(event: MessageEvent) {
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
    } = messageData;

    if (type === INIT_EVENT_TYPE_REQUEST) {
      const { props } = data;
      this.props = props;
      this.firstMessageData = {
        id,
        isReceived: true,
      };

      return;
    }

    if (type === EMIT_PARENT_TO_CHILD_EVENT) {
      this.listenersBus.emit(name, data);
    }

    if (type === CALL_API_REQUEST_EVENT) {
      const result = await this.api[name](data);
      this.sendMessage({
        id,
        data: result,
        name,
        type: CALL_API_RESPONSE_EVENT,
      });
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
        uid: this.uid,
      });
    } catch (e) {
      msg = createMessage({
        id,
        meta: {
          errorType: COERCING_ERROR,
        },
        name,
        type,
        uid: this.uid,
      });
    }

    window.parent.postMessage(msg, '*');
  }

  private async initialize() {
    const callback = (res: (value?: unknown) => void) => {
      requestAnimationFrame(() => {
        if (this.firstMessageData.isReceived) return res();
        callback(res);
      });
    };

    await new Promise(res => callback(res));

    this.sendMessage({
      data: Object.keys(this.api),
      id: this.firstMessageData.id,
      type: INIT_EVENT_TYPE_RESPONSE,
    });
  }

  public static async create(data: InitData) {
    const iframy = new IFramyChild(data);

    await iframy.initialize();

    return iframy;
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
      type: EMIT_CHILD_TO_PARENT_EVENT,
      uid: this.uid,
    });
  }
}
