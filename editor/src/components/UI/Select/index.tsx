import { FC, useContext, MutableRefObject } from 'react';
//
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
// utils
import { storage } from '../../../utils/ux';
import { getOptions } from '../../../utils/getOptions';
import { Context } from '../../../utils/getContext';
// types
import {
  attrsType,
  elementType,
  onComboChange,
  onFormType,
  optionType,
} from '../../../types';

type SelectProps = AntdSelectProps & {
  uref: MutableRefObject<HTMLDivElement>;
  onForm: onFormType;
  options: optionType[];
  ukey: string;
  target: number;
  element: elementType;
  attrs: attrsType;
  onComboChange?: onComboChange;
};

const Select: FC<SelectProps> = ({
  defaultValue,
  disabled,
  onForm,
  options,
  ukey,
  uref,
  target,
  element,
  onComboChange,
}) => {
  const { lang } = useContext(Context);

  const onChange = (value: string) => {
    onForm(ukey, value);
    storage('settings').add(ukey, {
      target,
      value,
      element,
    });
  };

  return (
    <div ref={uref}>
      <AntdSelect
        disabled={disabled}
        defaultValue={defaultValue}
        options={getOptions(options, lang)}
        onChange={onChange}
      />
    </div>
  );
};

export default Select;
