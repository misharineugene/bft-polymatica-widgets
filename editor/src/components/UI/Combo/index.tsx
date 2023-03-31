import { useState, useContext, FC, MutableRefObject } from 'react';
//
import { Row, Col } from 'antd';
// utils
import { storage } from '../../../utils/ux';
import { getElement } from '../../../utils/getElement';
import { Context } from '../../../utils/getContext';
// types
import {
  elementType,
  childType,
  onFormType,
  valueType,
  onComboChange,
} from '../../../types';

type ComboProps = {
  defaultValue: valueType;
  uref: MutableRefObject<HTMLDivElement>;
  onForm: onFormType;
  ukey: string;
  element: elementType;
  target: number;
  kids: childType[];
};

const Combo: FC<ComboProps> = ({
  defaultValue,
  ukey,
  uref,
  element,
  target,
  kids,
}) => {
  const { lang } = useContext(Context);

  const [fullValue, setFullValue] = useState<(string | null)[]>(
    String(defaultValue).split('::'),
  );

  const onChange: onComboChange = (value, index) => {
    fullValue[Number(index)] = String(value);

    storage('settings').add(ukey, {
      target,
      value: fullValue.join('::'),
      element,
    });

    setFullValue(fullValue);
  };

  return (
    <div ref={uref}>
      <Row gutter={16}>
        {kids.map((kid, index) => {
          const { key, label, col, element, attrs, ...kidProps } = kid;
          //
          const Element = getElement(element);

          return (
            <Col {...col} key={key}>
              <Element
                onComboChange={onChange}
                ukey={key + '_' + index}
                attrs={{ ...attrs, addonBefore: label[lang] }}
                {...kidProps}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Combo;
