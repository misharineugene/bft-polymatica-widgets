import { FC, useContext, useState, MutableRefObject } from 'react';
//
import { Radio, RadioChangeEvent } from 'antd';
// utils
import { storage } from '../../../utils/ux';
import { getOptions } from '../../../utils/getOptions';
import { Context } from '../../../utils/getContext';
// types
import { elementType, optionType } from '../../../types';

type RadioButtonProps = {
  uref: MutableRefObject<HTMLDivElement>;
  disabled: boolean;
  defaultValue: string;
  options: optionType[];
  target: number;
  ukey: string;
  element: elementType;
};

const RadioButton: FC<RadioButtonProps> = ({
  disabled,
  defaultValue,
  options,
  uref,
  target,
  ukey,
  element,
}) => {
  const [value, setValue] = useState(defaultValue);
  const { lang } = useContext(Context);

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
    storage('settings').add(ukey, {
      target,
      value,
      element,
    });
  };

  return (
    <Radio.Group
      ref={uref}
      onChange={onChange}
      disabled={disabled}
      options={getOptions(options, lang)}
      value={value}
      optionType="button"
      buttonStyle="solid"
    />
  );
};

export default RadioButton;
