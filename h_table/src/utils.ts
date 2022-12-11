import { select } from 'ptnl-constructor-sdk/config';
import React from 'react';
import { hrs } from './constants';

export const toSlug = (string) => {
  const translate = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'j',
    з: 'z',
    и: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: "'",
    ы: 'i',
    ь: "'",
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return string
    .toLowerCase()
    .replace(/\s/g, '')
    .split('')
    .map((letter) => translate[letter] || letter)
    .join('');
};
//
export const toNumber = (value): number => {
  if (typeof value === 'object') value = getChild(value);

  return Number(value.toString().replace(/\s/gi, '').replace(',', '.'));
};
//
export const unique = (arr: string[]) => Array.from(new Set(arr));
//
export const filter = (arr, value, key?) =>
  arr.filter((item) => (key ? item[key] === value : item === value));
//
export const sort = (a, b, isStrings?) => {
  const typeA = typeof a;
  const typeB = typeof a;

  if (typeA !== typeB) return 0;

  if (typeA === 'object') {
    a = getChild(a);
    b = getChild(b);
  }

  if (isStrings) {
    return a.localeCompare(b);
  }

  return toNumber(a) - toNumber(b);
};
//
export const random = () => {
  return Math.random().toString().slice(2);
};
//
export const getKey = () => {
  return ((Number(random()) * Number(random())) / Number(random())).toString();
};
//
export const getChildrenByLevel = (obj, level) => {
  let ref = obj.children;

  for (let i = 1; i <= level; i++) {
    ref = ref[0]?.children || ref;
  }

  return ref;
};
//
export const nameToPath = (block) => {
  return block.reduce((acc, item) => {
    const { name, path } = item;
    acc[name] = path;

    return acc;
  }, {});
};
//
export const slugToPath = (block) => {
  return block.reduce((acc, item) => {
    const { name, path } = item;
    acc[toSlug(name)] = path;

    return acc;
  }, {});
};
//
export const nameToType = (block) => {
  return block.reduce((acc, item) => {
    const { name, type } = item;
    acc[name] = type;

    return acc;
  }, {});
};
//
export const slugToType = (block) => {
  return block.reduce((acc, item) => {
    const { name, type } = item;
    acc[toSlug(name)] = type;

    return acc;
  }, {});
};
// React /////////
export const toStrong = (value, extraProps?) => {
  return React.createElement('strong', {
    children: value,
    ...extraProps,
  });
};
//
export const getChild = (element) => {
  let result = '';

  const getChildren = (reactElement) => {
    if (typeof reactElement === 'object') {
      getChildren(reactElement.props.children);
    } else {
      result = reactElement;
    }
  };

  getChildren(element);

  return result;
};
///////////
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

export const getBlockLabel = (ru, en) => {
  const ruSideLength = Math.floor((28 - ru.length) / 2);
  const enSideLength = Math.floor((28 - en.length) / 2);

  const ruSide = new Array(ruSideLength).fill('—').join('');
  const enSide = new Array(enSideLength).fill('—').join('');

  return [['hr', ruSide + ru + ruSide, enSide + en + enSide]];
};

export const getHR = (name?) => {
  return select({
    key: 'Horizontal',
    label: { ru: '', en: '' },
    options: (name || hrs).map(getSelectItems),
    defaultValue: (name || hrs)[0][0],
  });
};
