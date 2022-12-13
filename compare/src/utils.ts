import { select } from 'ptnl-constructor-sdk/config';
import { hrs } from './constants';
//
import Color from 'color';

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
//
export const calculate = (string) => {
  const arr = string.split(' ');

  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      result = +arr[i];
    }

    if (
      (arr[i] === '0' && arr[i + 1] === '/') ||
      (arr[i] === '/' && arr[i + 1] === '0')
    ) {
      result = +0;

      continue;
    }

    switch (arr[i]) {
      case '+':
        result += +arr[i + 1];
        ++i;
        break;

      case '-':
        result -= +arr[i + 1];
        ++i;
        break;

      case '/':
        result /= +arr[i + 1];
        ++i;
        break;

      case '*':
        result *= +arr[i + 1];
        ++i;
        break;
    }
  }

  return result;
};
//
export const getColumn = (name, value, style?) => {
  return `<div class="root__item" >${name} <strong ${
    style ? 'style="' + style + '"' : ''
  }>${value}</strong></div>`;
};
//
export const getRangeColor = (colors, range) => {
  const [colorMin, colorMax] = colors;
  const [max, porog, min] = range.split(' > ');
  const percent = (max - min) / 100;

  const minPercent = Math.round((porog - min) / percent);
  const maxPercent = Math.round((max - porog) / percent);

  const minColors = new Array(minPercent).fill('');
  const maxColors = new Array(maxPercent).fill('');

  const minLighten = 100 - minPercent > 25 ? 0.0025 : 0.0075;
  const maxLighten = 100 - maxPercent > 25 ? 0.005 : 0.0075;

  const newColors = {};

  minColors.forEach((_, index) => {
    const isFirst = index === 0;
    minColors[index] = isFirst
      ? Color(colorMin).hex()
      : Color(minColors[index - 1])
          .lighten(minLighten)
          .hex();
  });

  maxColors.forEach((_, index) => {
    const isFirst = index === 0;
    maxColors[index] = isFirst
      ? Color(colorMax).hex()
      : Color(maxColors[index - 1])
          .lighten(maxLighten)
          .hex();
  });

  minColors.forEach((color, index) => {
    newColors[index] = color;
  });

  maxColors.reverse().forEach((color, index) => {
    newColors[minColors.length + index] = color;
  });

  return {
    colors: newColors,
    max,
    porog,
    min,
  };
};
