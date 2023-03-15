import { FC, useContext } from 'react';
//
import { Form, Typography } from 'antd';
// utils
import { Context } from '../../utils/getContext';
import { getElement } from '../../utils/getElement';
// hooks
import { formulaType } from '../../hooks/useFormula';
// types
import { onFormType, urefType } from '../../types';
//
const { Text } = Typography;

type FormItemProps = {
  uref?: urefType;
  label: {
    ru: string;
    en: string;
  };
  element: string;
  className?: string;
  disabled: boolean;
  hidden?: boolean;
  formula?: formulaType;
  onForm: onFormType;
  ukey: string;
};

const FormItem: FC<FormItemProps> = ({
  label,
  element,
  className,
  disabled,
  hidden,
  formula,
  ...props
}) => {
  const { lang } = useContext(Context);
  //
  const Element = getElement(element);

  return (
    <Form.Item
      colon={false}
      label={
        element === 'list' || element === 'formList' ? null : (
          <Text {...(disabled && { disabled })}>{label[lang]}:</Text>
        )
      }
      className={className}
      hidden={hidden}
    >
      <Element
        {...((element === 'formula' || element === 'formList') && {
          formula,
        })}
        disabled={disabled}
        {...{ element, ...props }}
      />
    </Form.Item>
  );
};

export default FormItem;
