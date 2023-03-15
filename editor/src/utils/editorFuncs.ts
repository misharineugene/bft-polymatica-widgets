import { elementType, settingItemType } from '../types';

const selectorByElement = (element: elementType) => {
  switch (element) {
    case 'switch':
      return '.ant-checkbox-input';
    case 'color':
      return '.input-color';
    default:
      return '.ant-input';
  }
};
////////////////////////////////////////////////////
const eventByElement = (element: elementType) => {
  const change = new Event('change');
  const input = new Event('input');

  switch (element) {
    case 'switch':
      return change;
    default:
      return input;
  }
};
////////////////////////////////////////////////////
const getNodes = () => {
  const site = window.parent.document;
  const steps = site.querySelectorAll('.ant-steps-item');
  const columns = site.querySelectorAll('.content-item');
  const items = site.querySelectorAll(
    'app-view-options .ant-form-item.ng-star-inserted',
  );
  //
  const root = document.getElementById('root');
  const editor = root!.querySelector('[data-target=editor]');
  //
  const [_, secondStep] = Array.from(steps);
  const [previewCol, settingsCol] = Array.from(columns);
  const isViewSettings =
    secondStep && secondStep.classList.contains('ant-steps-item-active');

  return {
    items,
    editor,
    isViewSettings,
    previewCol,
    settingsCol,
    secondStep,
  };
};
////////////////////////////////////////////////////
export const dispatch = (setting: settingItemType) => {
  const { items } = getNodes();
  const { target, element, value } = setting;
  const selector = selectorByElement(element);
  const event = eventByElement(element);
  const node = items[target].querySelector(selector) as HTMLInputElement;

  if (element === 'switch') {
    node.checked = Boolean(value);
  } else {
    node.value = String(value);
  }

  node.dispatchEvent(event);
};
////////////////////////////////////////////////////
export const editorInit = () => {
  const { secondStep, isViewSettings } = getNodes();

  if (isViewSettings) {
    const observer = new MutationObserver(() => {
      editorToggle();
    });

    observer.observe(secondStep, {
      attributes: true,
      attributeFilter: ['class'],
    });
    editorShow();
  }
};
////////////////////////////////////////////////////
const editorToggle = () => {
  const { isViewSettings } = getNodes();

  isViewSettings ? editorShow() : editorHide();
};
////////////////////////////////////////////////////
const editorShow = () => {
  const { previewCol, settingsCol, editor } = getNodes();

  previewCol.classList.remove('ant-col-12');
  previewCol.classList.add('ant-col-24');
  //
  settingsCol.setAttribute('hidden', '');
  editor!.removeAttribute('hidden');
};
////////////////////////////////////////////////////
export const editorHide = () => {
  const { previewCol, settingsCol, editor } = getNodes();

  previewCol.classList.add('ant-col-12');
  previewCol.classList.remove('ant-col-24');
  //
  settingsCol.removeAttribute('hidden');
  editor!.setAttribute('hidden', '');
};
