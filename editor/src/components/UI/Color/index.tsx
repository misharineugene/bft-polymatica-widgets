import { FC, MutableRefObject, useState } from 'react';
//
import { SketchPicker, Color as ReactColor, ColorResult } from 'react-color';
//
import { default as JSColor } from 'color';
//
import style from './style.module.scss';
import { storage } from '../../../utils/ux';
import { elementType } from '../../../types';
//
import cn from 'classnames';

type ColorProps = {
  uref: MutableRefObject<null>;
  defaultValue: ReactColor;
  target: number;
  ukey: string;
  element: elementType;
};

const Color: FC<ColorProps> = ({
  defaultValue,
  uref,
  target,
  ukey,
  element,
}) => {
  const [color, setColor] = useState(JSColor(defaultValue).hex());
  const [visible, setVisible] = useState(false);

  const onChange = (value: ColorResult) => {
    const color = value.hex;

    setColor(color);
    storage('settings').add(ukey, {
      target,
      value: color,
      element,
    });
  };

  return (
    <>
      <div
        ref={uref}
        className={cn(style.swatch, {
          [style['swatch__active']]: visible,
        })}
        onClick={() => setVisible((prevState) => !prevState)}
      >
        <div className={style.color} style={{ backgroundColor: color }} />
      </div>
      {visible ? (
        <div className={style.popover}>
          <div className={style.cover} onClick={() => setVisible(false)} />
          <SketchPicker color={color} onChange={onChange} />
        </div>
      ) : null}
    </>
  );
};

export default Color;
