import { FC, MutableRefObject, useContext } from 'react';
//
import { Slider as AntdSlider, SliderSingleProps } from 'antd';
// utils
import { storage } from '../../../utils/ux';
import { valueType } from 'antd/es/statistic/utils';
// types
import { attrsType, elementType, onComboChange } from '../../../types';

type NumberProps = SliderSingleProps & {
  uref: MutableRefObject<HTMLInputElement>;
  target: number;
  ukey: string;
  element: elementType;
  attrs: attrsType;
  onComboChange?: onComboChange;
};

const Slider: FC<NumberProps> = ({
  disabled,
  defaultValue,
  uref,
  target,
  ukey,
  element,
  attrs,
  onComboChange,
}) => {
  const [key, index] = ukey.split('_');

  const onChange = (value: valueType | null) => {
    if (onComboChange) {
      onComboChange(value, index);
    } else {
      storage('settings').add(key, {
        target,
        value,
        element,
      });
    }
  };

  return (
    <div ref={uref}>
      <AntdSlider
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        {...attrs}
      />
    </div>
  );
};

export default Slider;
