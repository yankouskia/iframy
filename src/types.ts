export type MessageData = {
  type: string,
  id?: string,
  data?: any,
  name?: string,
  uid?: string,
};

export type Listener = (data?: any) => any;
