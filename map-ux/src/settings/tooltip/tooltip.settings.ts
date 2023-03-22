import { input, checkbox, select } from 'ptnl-constructor-sdk/config';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// consts
import { triggerOn } from './tooltip.consts';
// types
import { TooltipEViewKey } from './tooltip.types';

export const getTooltipSettings = () => {
  return [
    checkbox({
      key: TooltipEViewKey.Show,
      label: {
        ru: 'Включить',
        en: 'Turn on',
      },
      defaultValue: true,
    }),
    //
    input({
      key: TooltipEViewKey.TriggerOn,
      label: {
        ru: 'Условие срабатывания',
        en: 'Conditions to trigger',
      },
      defaultValue: triggerOn[0][0],
    }),
    select({
      key: TooltipEViewKey.TriggerOn,
      label: {
        ru: 'Условие срабатывания',
        en: 'Conditions to trigger',
      },
      options: triggerOn.map(getSelectItems),
      defaultValue: triggerOn[0][0],
    }),
  ];
};
