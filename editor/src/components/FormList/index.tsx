import { FC, Fragment, MutableRefObject, useContext } from 'react';
//
import { Button, Divider, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
//
import FormItem from '../FormItem';
// hooks
import { formulaType } from '../../hooks/useFormula';
// consts
import { MAX_WIDTH } from '../../constants/global';
// utils
import { Context } from '../../utils/getContext';
// types
import { labelType, onFormType, childType } from '../../types';
//
import cn from 'classnames';
import { storage } from '../../utils/ux';

type FormListProps = {
  uref: MutableRefObject<null>;
  ukey: string;
  onForm: onFormType;
  className: string;
  kids: childType[];
  disabled: boolean;
  formListWords: labelType[];
  formula: formulaType;
  target: number;
};

const FormList: FC<FormListProps> = ({
  uref,
  ukey,
  kids,
  onForm,
  className,
  disabled,
  formula,
  formListWords,
  target,
}) => {
  const { lang } = useContext(Context);
  const [title, addText] = formListWords;

  return (
    <Form.List name={ukey}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Fragment key={index}>
              <Space>
                <Divider className="list-divider">
                  {title[lang] + ' ' + (index + 1)}
                </Divider>
                {index === fields.length - 1 ? (
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                      storage('settings').add(ukey, {
                        target:
                          target + (kids.length + 1) * (fields.length - 1),
                        value: false,
                        element: 'switch',
                      });

                      const findFormulaBy = kids.find(
                        (kid) => kid.formulaBy,
                      )?.formulaBy;

                      if (findFormulaBy) {
                        const mapKeyLower = findFormulaBy.toLowerCase();

                        const findKey = kids.find((kid) => {
                          const keyLower = kid.key.toLowerCase();

                          return keyLower.includes(mapKeyLower);
                        });

                        if (findKey) {
                          onForm(findKey.key + '_' + index, 'keyDeleted');
                        }
                      }
                    }}
                  />
                ) : null}
              </Space>
              {kids.map(({ key, target, ...props }) => {
                return (
                  <FormItem
                    uref={uref}
                    key={key + '_' + index}
                    ukey={key + '_' + index}
                    onForm={onForm}
                    disabled={disabled}
                    className={cn(className, 'list-wrap')}
                    formula={formula}
                    {...{
                      ...props,
                      target: target! + kids.length * index,
                    }}
                  />
                );
              })}
            </Fragment>
          ))}

          <Button
            ref={uref}
            disabled={fields.length === 3}
            style={{ maxWidth: MAX_WIDTH }}
            type="dashed"
            onClick={() => {
              add();
              storage('settings').add(ukey, {
                target: target + (kids.length + 1) * fields.length,
                value: true,
                element: 'switch',
              });
            }}
            block
            icon={<PlusOutlined />}
          >
            {addText[lang]}
          </Button>
        </>
      )}
    </Form.List>
  );
};

export default FormList;
