export const getMode = () => {
  const { hostname } = window.parent.location;
  return hostname === 'localhost' ? 'dev' : 'prod';
};
