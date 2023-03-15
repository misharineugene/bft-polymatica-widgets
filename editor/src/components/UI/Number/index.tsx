import { FC, MutableRefObject } from 'react';
//
import { InputNumber, InputNumberProps } from 'antd';
// utils
import { storage } from '../../../utils/ux';
import { valueType } from 'antd/es/statistic/utils';
// types
import { elementType } from '../../../types';

type NumberProps = InputNumberProps & {
  uref: MutableRefObject<HTMLInputElement>;
  target: number;
  ukey: string;
  element: elementType;
};

const Number: FC<NumberProps> = ({
  disabled,
  defaultValue,
  uref,
  target,
  ukey,
  element,
}) => {
  const onChange = (value: valueType | null) => {
    storage('settings').add(ukey, {
      target,
      value,
      element,
    });
  };

  return (
    <InputNumber
      ref={uref}
      disabled={disabled}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default Number;
