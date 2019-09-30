const PROPS_NAME = 'props';

export function extractProps() {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == PROPS_NAME) {
      return JSON.parse(atob(decodeURIComponent(pair[1])));
    }
  }

  throw new Error('Props are transferred incorrectly and cannot be parsed');
}

export const createMessage = ({
  id,
  type,
  data = null,
  name,
}) => JSON.stringify({
  type,
  payload: {
    id,
    data,
    name,
  },
});

export const parseMessage = msg => {
  const {
    type,
    payload: {
      data = null,
      name,
    } = {},
  } = JSON.parse(msg);

  return {
    type,
    name,
    data,
  };
}
