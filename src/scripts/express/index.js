import { addParamsToURL } from '../../utils';

const getExpressScriptFile = (params) => {
  return new Promise((resolve, reject) => {
    let url = `${process.env.REACT_APP_BASE_URL}/express`;
    url = addParamsToURL(url, params);
    fetch(url)
      .then((res) => {
        res.text().then((text) => {
          resolve(text);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getExpressScriptFile;
