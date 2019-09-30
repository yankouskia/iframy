export function encodeProps(props) {
  const stringified = JSON.stringify(props);
  const base64 = btoa(stringified);
  const uri = `?props=${encodeURIComponent(base64)}`;

  return uri;
}
