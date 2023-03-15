import { constants, getProjectUrl } from './index';
//
const { STORE_NAME } = constants;

export const storage = (name: string) => {
  const projectUrl = getProjectUrl();

  let store = localStorage.getItem(STORE_NAME);

  return {
    get: (parse = false, html = false) => {
      if (!store) return null;
      //
      const storeObj = JSON.parse(store);
      //
      const value = storeObj?.[projectUrl]?.[name] || '';

      if (parse) {
        return JSON.parse(value);
      }

      if (html) {
        return new DOMParser().parseFromString(value, 'text/html');
      }

      return value;
    },
    getByKey: (key: string, parse = false, html = false) => {
      if (!store) return null;
      //
      const storeObj = JSON.parse(store);
      //
      const value = storeObj?.[projectUrl]?.[name]?.[key] || '';

      if (parse && typeof value === 'string') {
        return JSON.parse(value);
      }

      if (html) {
        return new DOMParser().parseFromString(value, 'text/html');
      }

      return value;
    },
    set: (value: any, stringify = false) => {
      if (!store) {
        store = JSON.stringify({ [projectUrl]: {} });
        localStorage.setItem(STORE_NAME, store);
      }

      if (stringify) value = JSON.stringify(value);

      const storeObj = JSON.parse(store);
      storeObj[projectUrl][name] = value;

      localStorage.removeItem(STORE_NAME);
      localStorage.setItem(STORE_NAME, JSON.stringify(storeObj));
    },
    add: (key: string, value: any, stringify = false) => {
      if (!store) {
        store = JSON.stringify({ [projectUrl]: {} });
        localStorage.setItem(STORE_NAME, store);
      }

      if (stringify) value = JSON.stringify(value);

      const storeObj = JSON.parse(store);
      if (!storeObj[projectUrl][name]) {
        storeObj[projectUrl][name] = {};
      }
      storeObj[projectUrl][name][key] = value;

      localStorage.removeItem(STORE_NAME);
      localStorage.setItem(STORE_NAME, JSON.stringify(storeObj));
      document.dispatchEvent(new Event('storage::updated'));
    },
    del: () => {
      if (store) {
        const storeObj = JSON.parse(store);
        delete storeObj[projectUrl]?.[name];

        localStorage.removeItem(STORE_NAME);
        localStorage.setItem(STORE_NAME, JSON.stringify(storeObj));
      }
    },
    delByKey: (key: string) => {
      if (store) {
        const storeObj = JSON.parse(store);
        delete storeObj[projectUrl]?.[name]?.[key];

        localStorage.removeItem(STORE_NAME);
        localStorage.setItem(STORE_NAME, JSON.stringify(storeObj));
      }
    },
  };
};
