const getExpressScriptFile = (
  projectName,
  projectDescription,
  projectAuthor
) => {
  return new Promise((resolve, reject) => {
    const url = `${process.env.REACT_APP_BASE_URL}/express?name=${projectName}&description=${projectDescription}&author=${projectAuthor}`;
    fetch(encodeURI(url))
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
