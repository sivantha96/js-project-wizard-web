export const generateRandomId = (length) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function addParamsToURL(url, params) {
  if (params && Object.entries(params).length !== 0 && params.constructor === Object) {
      let temp = url;
      let count = 0;
      for (let [key, value] of Object.entries(params)) {
          const valEncoded = encodeURIComponent(value);
          temp = temp + `${count === 0 ? '?' : '&'}${key}=${valEncoded}`;
          count++;
      }
      return temp;
  }
  return url;
}
