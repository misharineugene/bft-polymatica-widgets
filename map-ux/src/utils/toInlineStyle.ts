export const toInlineStyle = (styles) => {
  return Object.keys(styles)
    .map((key) => key + ': ' + styles[key])
    .join(';');
};
