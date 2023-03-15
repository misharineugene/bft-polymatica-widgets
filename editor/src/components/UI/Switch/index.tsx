import { FC, MutableRefObject } from 'react';
//
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
// utils
import { storage } from '../../../utils/ux';
// types
import { elementType, onFormType } from '../../../types';

type SwitchProps = AntdSwitchProps & {
  uref: MutableRefObject<HTMLDivElement>;
  defaultValue: boolean;
  onForm: onFormType;
  target: number;
  ukey: string;
  element: elementType;
};

const Switch: FC<SwitchProps> = ({
  defaultValue,
  disabled,
  onForm,
  target,
  element,
  ukey,
  uref,
}) => {
  const onChange = (value: boolean) => {
    onForm(ukey, value);
    storage('settings').add(ukey, {
      target,
      value,
      element,
    });
  };

  return (
    <AntdSwitch
      ref={uref}
      disabled={disabled}
      defaultChecked={defaultValue}
      onChange={onChange}
    />
  );
};

export default Switch;
