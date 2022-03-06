export const getExpressScriptFile = (body) => {
  return new Promise((resolve, reject) => {
    let url = `${process.env.REACT_APP_BASE_URL}/express`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
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

export const getRNScriptFile = (body) => {
  console.log(body)
  return new Promise((resolve, reject) => {
    let url = `${process.env.REACT_APP_BASE_URL}/react-native`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
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
