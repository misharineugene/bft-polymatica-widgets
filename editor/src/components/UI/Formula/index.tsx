import { FC, MutableRefObject } from 'react';
//
import { Mentions } from 'antd';
import { MentionProps, MentionsOptionProps } from 'antd/es/mentions';
// consts
import { ELEMENT_WIDTH } from '../../../constants/global';
// types
import { optionType } from '../../../types';
import { formulaType } from '../../../hooks/useFormula';

type FormulaProps = MentionProps & {
  uref: MutableRefObject<null>;
  ukey: string;
  options: optionType[];
  formula: formulaType;
};

const Formula: FC<FormulaProps> = ({ formula, ukey, defaultValue, uref }) => {
  const onChange = (value: string) => {
    console.log('Change:', value);
  };

  const onSelect = (option: MentionsOptionProps) => {
    console.log('select', option);
  };

  const getOptions = () => {
    const key = ukey.split('_').shift();
    const result: MentionsOptionProps[] = [];

    if (formula && key) {
      Object.values(formula[key]).forEach((value) => {
        result.push({
          value,
          label: value,
        });
      });
    }

    return result;
  };

  return (
    <Mentions
      ref={uref}
      prefix="#"
      style={{ width: ELEMENT_WIDTH }}
      onChange={onChange}
      onSelect={onSelect}
      defaultValue={defaultValue}
      options={getOptions()}
    />
  );
};

export default Formula;
