import { FC, Fragment, MutableRefObject } from 'react';
//
import { Divider } from 'antd';
//
import FormItem from '../FormItem';
// hooks
import { useAppState } from '../../hooks/useAppState';
import { formulaType } from '../../hooks/useFormula';
// utils
import { getValueByTpl } from '../../utils/getValueByTpl';
// types
import { labelType, onFormType, childType } from '../../types';
//
import cn from 'classnames';

type ListProps = {
  uref: MutableRefObject<null>[];
  ukey: string;
  onForm: onFormType;
  className: string;
  kids: childType[];
  disabled: boolean;
  formListWords: labelType[];
  formula: formulaType;
};

const List: FC<ListProps> = ({
  uref,
  ukey,
  kids,
  onForm,
  className,
  disabled,
  formula,
}) => {
  const { columnsByBlock } = useAppState();

  const columns = columnsByBlock[ukey];

  return (
    <>
      {columns.map((column, index) => (
        <Fragment key={index}>
          <Divider className="list-divider">{column.name}</Divider>
          {kids.map(({ key, defaultValue, target, ...props }, itemIndex) => {
            return (
              <FormItem
                {...(index === 0 && { uref: uref[itemIndex] })}
                key={key + '_' + index}
                ukey={key + '_' + index}
                onForm={onForm}
                disabled={disabled}
                className={cn(className, 'list-wrap')}
                formula={formula}
                {...{
                  ...props,
                  target: target! + kids.length * index,
                  defaultValue: getValueByTpl(column, defaultValue),
                }}
              />
            );
          })}
        </Fragment>
      ))}
    </>
  );
};

export default List;
