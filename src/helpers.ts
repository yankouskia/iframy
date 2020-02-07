import { MessageData } from './types';

/**
 * Method to create string message to pass via postMessage API
 * @param id uniq identifier for each message
 * @param type type for each message, used from limited enum
 * @param data payload to pass in message (could be return value for API, or argument in event)
 * @param meta meta info to pass specific info like errors to other window
 * @param name name of specific event or function name
 * @returns json view of message structure
 */
export const createMessage = ({
  id,
  type,
  data = null,
  meta = null,
  name = null,
  uid = null,
}: MessageData): string => JSON.stringify({
  id,
  data,
  meta,
  name,
  type,
  uid,
});

/**
 * Method to create string message to pass via postMessage API
 * @param msg json view of message structure
 * @returns object message structure
 */
export const parseMessage = (msg: string) => {
  const {
    id,
    data,
    meta,
    name,
    type,
    uid,
  } = JSON.parse(msg);

  return {
    id,
    data,
    meta,
    name,
    type,
    uid,
  };
}
