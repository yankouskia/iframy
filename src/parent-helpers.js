export const createMessage = ({
  type,
  data = null,
  name,
}) => JSON.stringify({
  type,
  payload: {
    data,
    name,
  },
});

export const parseMessage = msg => {
  const {
    type,
    payload: {
      id,
      data = null,
      name,
    } = {},
  } = JSON.parse(msg);

  return {
    id,
    type,
    name,
    data,
  };
}
