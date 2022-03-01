export default function (token = '', action) {
  if (action.type === 'addToken') {
    return action.token;
  } else if (action.type === 'clearToken') {
    return '';
  } else {
    return token;
  }
}
