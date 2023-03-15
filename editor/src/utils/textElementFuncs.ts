import { default as JSColor } from 'color';
// utils
import { storage } from './ux';
// types
import { hasArrType, richType } from '../types';

export const textDispatch = (content: string, ukey: string, target: number) => {
  storage('settings').add(ukey, {
    target: target,
    value: content,
    element: 'input',
  });

  let count = 0;
  const textArr: string[] = [];
  const tplArr: string[] = [];
  const richArr: richType = {};
  //
  const html = new DOMParser().parseFromString(content, 'text/html');
  //
  const paragraphs = html.querySelectorAll('p');
  paragraphs.forEach((p, index, arr) => {
    const isLast = index === arr.length - 1;
    const lineBreak = isLast ? '' : '\\n';

    textArr.push(p.textContent + lineBreak);
    p.innerHTML += lineBreak;
  });

  storage('settings').add(ukey + 'Text', {
    target: target + 1,
    value: textArr.join(''),
    element: 'input',
  });

  const setText = (nodes: NodeList) => {
    nodes.forEach((node) => {
      if (node.nodeName !== '#text') {
        setText(node.childNodes);
      } else {
        let innerHTML = '';

        node.parentNode?.childNodes.forEach((child) => {
          if (child.nodeName === '#text') {
            innerHTML += `<span>${child.textContent}</span>`;
          } else {
            //@ts-ignore
            innerHTML += child.outerHTML;
          }
        });

        //@ts-ignore
        if (node.parentNode) node.parentNode.innerHTML = innerHTML;
      }
    });
  };

  const getText = (elements: NodeListOf<HTMLElement>) => {
    elements.forEach((element) => {
      const children: NodeListOf<HTMLElement> =
        element.querySelectorAll(':scope > *');

      if (children.length) {
        getText(children);
      } else {
        const style_name = 's_' + count;
        tplArr.push(`{${style_name}|${element.textContent}}`);

        richArr[style_name] = {};
        const hasArr: hasArrType = {
          fontSize: false,
          color: false,
          backgroundColor: false,
          fontWeight: false,
          fontStyle: false,
          lineHeight: false,
          align: false,
        };
        getRich(element, style_name, hasArr);
        count++;
      }
    });
  };

  const getRich = (
    node: HTMLElement,
    style_name: string,
    hasArr: hasArrType,
  ) => {
    const { style, nodeName, parentElement } = node;

    if (nodeName !== 'BODY') {
      if (style.fontSize && !hasArr.fontSize) {
        storage('settings').add(ukey + 'FontSize', {
          target: target + 2,
          value: style.fontSize.replace('px', ''),
          element: 'input',
        });
        richArr[style_name].fontSize = style.fontSize;
        hasArr.fontSize = true;
      }

      if (style.color && !hasArr.color) {
        storage('settings').add(ukey + 'Color', {
          target: target + 3,
          value: JSColor(style.color).hex(),
          element: 'color',
        });
        richArr[style_name].color = style.color;
        hasArr.color = true;
      }

      if (style.backgroundColor && !hasArr.backgroundColor) {
        richArr[style_name].backgroundColor = style.backgroundColor;
        hasArr.backgroundColor = true;
      }

      if (nodeName === 'STRONG' && !hasArr.fontWeight) {
        storage('settings').add(ukey + 'Bold', {
          target: target + 4,
          value: true,
          element: 'switch',
        });
        richArr[style_name].fontWeight = 'bold';
        hasArr.fontWeight = true;
      } else if (nodeName === 'EM' && !hasArr.fontStyle) {
        storage('settings').add(ukey + 'Italic', {
          target: target + 5,
          value: true,
          element: 'switch',
        });
        richArr[style_name].fontStyle = 'italic';
        hasArr.fontStyle = true;
      }

      if (style.lineHeight && !hasArr.lineHeight) {
        storage('settings').add(ukey + 'LineHeight', {
          target: target + 6,
          value: style.lineHeight,
          element: 'input',
        });
        richArr[style_name].lineHeight = style.lineHeight;
        hasArr.lineHeight = true;
      }

      if (style.textAlign && !hasArr.align) {
        storage('settings').add(ukey + 'TextAlign', {
          target: target + 7,
          value: style.textAlign,
          element: 'input',
        });
        richArr[style_name].align = style.textAlign;
        hasArr.align = true;
      }

      if (parentElement) getRich(parentElement, style_name, hasArr);
    }
  };

  setText(paragraphs);
  getText(paragraphs);

  const rich = {
    text: tplArr.join(''),
    style: richArr,
  };

  storage('settings').add(ukey + 'Rich', {
    target: target + 9,
    value: JSON.stringify(rich),
    element: 'input',
  });
};
