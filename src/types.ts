export type MessageData = {
  type: string,
  id?: string,
  data?: any,
  meta?: any,
  name?: string,
  uid?: string,
};

export type Listener = (data?: any) => any;
