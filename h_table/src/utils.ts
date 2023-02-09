import {
  checkbox,
  colorPicker,
  input,
  select,
} from 'ptnl-constructor-sdk/config';
import React from 'react';
import { hrs } from './constants';
import { EViewKey } from './enum';
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
    .toString()
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
  arr.filter((item) => (key ? item[key] == value : item == value));
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
export const getIsValue = (value, plus = false) => {
  return plus ? isFinite(value) && value >= 0 : isFinite(value);
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
export const toTag = (value, color, isStrong = false) => {
  return React.createElement('span', {
    children: value,
    className: isStrong ? 'tag strong' : 'tag',
    style: {
      backgroundColor: color,
      borderColor: Color(color).darken(0.5).hex(),
    },
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
//
export const getHR = (name?) => {
  return select({
    key: 'Horizontal',
    label: { ru: '', en: '' },
    options: (name || hrs).map(getSelectItems),
    defaultValue: (name || hrs)[0][0],
  });
};
//
export const getValuesHideSelect = (rowsBlock) => {
  const rowsBlockLength = rowsBlock.length;
  //
  return {
    options: rowsBlock.map((_, index) => {
      const isFirst = index === 0;
      const isLast = index === rowsBlockLength - 1;
      const isOnce = rowsBlockLength === 1;
      const revIdx = rowsBlockLength - 1 - index;
      const value = revIdx.toString();
      //
      let label = (revIdx + 1).toString();
      label = isFirst
        ? label + (isOnce ? '' : ' (Последний уровень)')
        : label + ' — ' + rowsBlockLength;
      label = isLast && !isOnce ? label + ' (Все уровни)' : label;

      return {
        label: {
          ru: label,
          en: label,
        },
        value: value,
      };
    }),
    defaultValue: (rowsBlockLength - 1).toString(),
  };
};
//
export const getValuesNew = (count, values, valuesHideSelect) => {
  const newVals = new Array(count).fill([]);
  //
  const defFormula = values.splice(0, 2).map((valBlock) => {
    return valBlock.name;
  });

  for (let i = 0; i < count; i++) {
    const index = i + 1;
    //
    newVals[i] = [
      getHR(
        getBlockLabel(
          `Новый показатель (${index})`,
          `New indicator (${index})`,
        ),
      ),
      // 
      checkbox({
        key: EViewKey['newValAdd_' + i],
        label: {
          ru: `Добавить показатель`,
          en: `Add a indicator`,
        },
        defaultValue: false,
      }),
      //
      input({
        key: EViewKey['newValName_' + i],
        label: {
          ru: `Название`,
          en: `Name`,
        },
        defaultValue: 'Процент %',
      }),
      input({
        key: EViewKey['newValFormula_' + i],
        label: {
          ru: `Формула`,
          en: `Formula`,
        },
        defaultValue: defFormula.join(' / ') + ' * 100',
      }),
      checkbox({
        key: EViewKey['newValTotal_' + i],
        label: {
          ru: `Не рассчитывать итоги`,
          en: `Don't calculate totals`,
        },
        defaultValue: false,
      }),
      select({
        key: 'HideValue_col_new_' + i,
        label: {
          ru: `Отображать показатель на уровне`,
          en: `Display indicator on level`,
        },
        options: valuesHideSelect.options,
        defaultValue: '0',
      }),
      checkbox({
        key: EViewKey['newValColor_' + i],
        label: {
          ru: 'Подсветка значений',
          en: 'Highlight values',
        },
        defaultValue: false,
      }),
      colorPicker({
        key: EViewKey['newValColorMax_' + i],
        label: {
          ru: `Цвет ячеек (Наибольшее число для окрашивания)`,
          en: `Cell color (The largest number for staining)`,
        },
        defaultValue: 'green',
      }),
      input({
        key: EViewKey['newValColorThr_' + i],
        label: {
          ru: `Формула (Наибольшее число > Порог > Наименьшее число)`,
          en: `Formula (Highest number > Threshold > Lowest number)`,
        },
        defaultValue: '100 > 50 > 0',
      }),
      colorPicker({
        key: EViewKey['newValColorMin_' + i],
        label: {
          ru: `Цвет ячеек (Наименьшее число для окрашивания)`,
          en: `Cell сolor (Least number to color)`,
        },
        defaultValue: 'red',
      }),
    ];
  }

  return newVals;
};
//
export const calculate = (string) => {
  const arr = string
    .replace(/ \+ /gi, '__+__')
    .replace(/ - /gi, '__-__')
    .replace(/ \* /gi, '__*__')
    .replace(/ \/ /gi, '__/__')
    .split('__');
  const signs = ['+', '-', '*', '/'];

  let result = 0;

  if (arr.find((val) => !signs.includes(val) && isNaN(+val))) {
    return NaN;
  }

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      result = +arr[i];
    }

    if (
      (arr[i] === '0' && arr[i + 1] === '/') ||
      (arr[i] === '/' && arr[i - 1] === '0')
    ) {
      result = 0;
      continue;
    }

    switch (arr[i]) {
      case '+':
        result += +arr[i + 1];
        break;
      case '-':
        result -= +arr[i + 1];
        break;
      case '/':
        result /= +arr[i + 1];
        break;
      case '*':
        result *= +arr[i + 1];
        break;
    }
  }

  return result;
};
//
export const getRangeColor = (isTag, colors, range) => {
  const newColors = {};
  const [colorMin, colorMax] = colors;
  const [max, porog, min] = range.split(' > ');

  if (isTag) {
    const percent = (max - min) / 100;

    const minPercent = Math.round((porog - min) / percent);
    const maxPercent = Math.round((max - porog) / percent);

    const minColors = new Array(minPercent).fill('');
    const maxColors = new Array(maxPercent).fill('');

    const minLighten = 100 - minPercent > 25 ? 0.0025 : 0.0075;
    const maxLighten = 100 - maxPercent > 25 ? 0.005 : 0.0075;

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
  }

  return {
    isTag,
    colors: newColors,
    max,
    porog,
    min,
  };
};
// 
export const createDeepCopy = (input) => {
  if (input instanceof Date) {
    return new Date(input.getTime());
  }
  if (typeof input !== 'object') {
    return input;
  }
  let copy = Array.isArray(input) ? [] : {};
  for (let key in input) {
    const value = input[key];
    copy[key] = createDeepCopy(value);
  }

  return copy;
};
