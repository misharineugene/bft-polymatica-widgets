export const getProjectUrl = () => {
  const url =
    window.location !== window.parent.location
      ? document.referrer
      : document.location.href;

  const urlArr = url.replace(/(http(s?)):\/\//i, '').split('/');
  if (urlArr.length > 1) urlArr.shift();

  return urlArr[0] ? urlArr.join('/') : 'localhost';
};
