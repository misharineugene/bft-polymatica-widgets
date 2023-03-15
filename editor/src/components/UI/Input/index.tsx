import { ChangeEvent, FC, MutableRefObject, useEffect } from 'react';
//
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
// consts
import { ELEMENT_WIDTH } from '../../../constants/global';
// utils
import { storage } from '../../../utils/ux';
// types
import { elementType, onFormType } from '../../../types';

type InputProps = AntdInputProps & {
  uref: MutableRefObject<HTMLDivElement>;
  onForm: onFormType;
  ukey: string;
  element: elementType;
  target: number;
};

const Input: FC<InputProps> = ({
  disabled,
  defaultValue,
  onForm,
  ukey,
  uref,
  element,
  target,
}) => {
  useEffect(() => {
    dispatch(String(defaultValue));
  }, []);

  const dispatch = (value: string) => {
    onForm(ukey, value);
    storage('settings').add(ukey, {
      target,
      value,
      element,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(value);
  };

  return (
    <div ref={uref} style={{ width: ELEMENT_WIDTH }}>
      <AntdInput
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
