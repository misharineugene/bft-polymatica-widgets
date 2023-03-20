import { select } from 'ptnl-constructor-sdk/config';
//
import { getSelectItems } from './getSelectItems';
//
const hrs = [
  ['hr', '————————————————————————————', '————————————————————————————'],
];

const getHR = (name?) => {
  return select({
    key: 'Horizontal',
    label: { ru: '', en: '' },
    options: (name || hrs).map(getSelectItems),
    defaultValue: (name || hrs)[0][0],
  });
};

export const getGroupLabel = (ru, en) => {
  const ruSideLength = Math.floor((28 - ru.length) / 2);
  const enSideLength = Math.floor((28 - en.length) / 2);

  const ruSide = new Array(ruSideLength).fill('—').join('');
  const enSide = new Array(enSideLength).fill('—').join('');

  const name = [['hr', ruSide + ru + ruSide, enSide + en + enSide]];

  return getHR(name);
};
