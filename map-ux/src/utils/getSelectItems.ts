export const getSelectItems = (item) => {
  const [value, ru, en] = item;

  return {
    label: {
      ru,
      en,
    },
    value,
  };
};
