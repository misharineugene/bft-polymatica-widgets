import { FC, useContext, MutableRefObject } from 'react';
//
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
// consts
import { MAX_WIDTH } from '../../../constants/global';
// utils
import { storage } from '../../../utils/ux';
import { getOptions } from '../../../utils/getOptions';
import { Context } from '../../../utils/getContext';
// types
import { elementType, onFormType, optionType } from '../../../types';

type SelectProps = AntdSelectProps & {
  uref: MutableRefObject<HTMLDivElement>;
  onForm: onFormType;
  options: optionType[];
  ukey: string;
  target: number;
  element: elementType;
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
    <div ref={uref} style={{ maxWidth: MAX_WIDTH }}>
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
