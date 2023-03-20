// enum
import { EViewKey } from './enum';
// utils
import { storage } from './utils/ux';
// types
import { settingItemType } from './types';

const parent = window.parent.document;

const editorConfig = (widget) => {
  const { lang, data, columnsByBlock } = widget;

  return {
    lang,
    data,
    columnsByBlock,
    settings: [],
  };
};

const hideItems = () => {
  const items = parent.querySelectorAll<HTMLElement>(
    'app-view-options .ant-form-item.ng-star-inserted',
  );

  const hideArr = [];

  hideArr.forEach((index) => {
    items[index].style.cssText = `
      height: 1px;
      margin: 0;
      opacity: 0;
      visibility: hidden;
    `;
  });
};

export const initEditor = (widget) => {
  const settings = widget.viewSettings;

  const steps = parent.querySelectorAll('.ant-steps-item');
  const secondStep = steps && steps[1];
  const isViewSettings =
    secondStep && secondStep.classList.contains('ant-steps-item-active');

  if (isViewSettings) {
    hideItems();

    if (settings[EViewKey.CustomEditor]) {
      const isFirst = !window['editor'];
      //
      if (isFirst) window['editor'] = {};
      //
      window['editor']['state'] = editorConfig(widget);

      const interval = setInterval(() => {
        // @ts-ignore
        if (runEditor()) clearInterval(interval);
      }, 300);
    }

    document.addEventListener('storage::updated', () => {
      const editorSettings = storage('settings').get(true);
      const settings = Object.entries(editorSettings).reduce(
        (acc, [key, value]: [string, settingItemType]) => {
          acc[key] = value.value;

          return acc;
        },
        {},
      );

      widget.settings = {
        ...widget.viewSettings,
        ...settings,
      };

      widget._chart.setOption(widget.getChartOptions());
    });
  }
};
