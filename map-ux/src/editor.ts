// enum
import { EViewKey, EBlockKey } from './enum';
// utils
import { storage } from './utils/ux';
// types
import { settingItemType } from './types';
import { MapEViewKey } from './settings/map/map.types';
import { ClusterEViewKey } from './settings/cluster/cluster.types';
import { HeatEViewKey } from './settings/heat/heat.types';
import { TooltipEViewKey } from './settings/tooltip/tooltip.types';
import { DigitEViewKey } from './settings/digit/digit.types';

const parent = window.parent.document;

const editorConfig = (widget) => {
  const { lang, data, dataSettings, viewSettings: settings } = widget;
  const { columnsByBlock } = dataSettings;

  const [mapCenterLatitude, mapCenterLongitude] =
    settings[MapEViewKey.Center].split('::');

  return {
    lang,
    data,
    columnsByBlock,
    settings: [
      {
        key: 'Map',
        label: {
          ru: 'Карта',
          en: 'Map',
        },
        childs: [
          {
            key: 'mapCenter',
            label: {
              ru: 'Координаты',
              en: 'Coordinates',
            },
            col: {
              md: 12,
              lg: 10,
            },
            element: 'combo',
            kids: [
              {
                key: 'mapCenterLatitude',
                label: {
                  ru: 'Широта',
                  en: 'Latitude',
                },
                col: {
                  xs: 12,
                },
                element: 'number',
                defaultValue: mapCenterLatitude,
                attrs: {
                  min: -90,
                  max: 90,
                },
              },
              {
                key: 'mapCenterLongitude',
                label: {
                  ru: 'Долгота',
                  en: 'Longitude',
                },
                col: {
                  xs: 12,
                },
                element: 'number',
                defaultValue: mapCenterLongitude,
                attrs: {
                  min: -180,
                  max: 180,
                },
              },
            ],
            defaultValue: settings[MapEViewKey.Center],
            target: 2,
            help: {
              cover: ['mapCenter_0.jpg'],
              ru: {
                title: 'Координаты центра карты',
                description: `
                <p>
                  Центр видимой области при инициализации карты. Указываются координаты широты и долготы.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 66.25° и 94.15° - центр РФ</li>
                    <li><strong>Широта:</strong> от -90° до 90°</li>
                    <li><strong>Долгота:</strong>  от -180° до 180°</li>
                  </ul>
                  <hr />
                  <q>В ближайшее время добавлю функцию визуального определения нужных координат.</q>
                </p>`,
              },
              en: {
                title: 'Map center coordinates',
                description: `
                 <p>
                   The center of the viewable area when the map is initialized. Latitude and longitude coordinates are indicated.
                   <ul>
                     <li><strong>Default value:</strong> 66.25° and 94.15° - RF center</li>
                     <li><strong>Latitude:</strong> -90° to 90°</li>
                     <li><strong>Longitude:</strong> -180° to 180°</li>
                   </ul>
                   <hr />
                   <q>In the near future I will add the function of visual determination of the desired coordinates.</q>
                 </p>`,
              },
            },
          },
          {
            key: 'mapZoom',
            label: {
              ru: 'Зум',
              en: 'Zoom',
            },
            element: 'number',
            defaultValue: settings[MapEViewKey.Zoom],
            attrs: {
              min: 0,
              max: 20,
            },
            target: 3,
            help: {
              cover: ['mapZoom_0.jpg', 'mapZoom_1.jpg'],
              ru: {
                title: 'Зум при инициализации',
                description: `
                <p>
                  При загрузке виджета карта автоматически приблизит область по выбранным координатам указанных в настройке <strong><em>"Координаты"</em></strong> до указанного значения. 
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 4</li>
                    <li><strong>Минимальное значение:</strong> 0</li>
                    <li><strong>Максимальное значение:</strong> 18</li>
                  </ul>
                  <hr />
                  <q>На скриншотах изображены варианты при значениях 4 и 13</q>
                </p>`,
              },
              en: {
                title: 'Zoom on initialization',
                description: `
                <p>
                  When the widget is loaded, the map will automatically approximate the area at the selected coordinates specified in the <strong><em>"Coordinates"</em></strong> setting to the specified value.
                  <ul>
                    <li><strong>Default value:</strong> 4</li>
                    <li><strong>Minimum value:</strong> 0</li>
                    <li><strong>Max value:</strong> 18</li>
                  </ul>
                  <hr />
                  <q>The screenshots show options for values 4 and 13</q>
                </p>`,
              },
            },
          },
        ],
      },
      {
        key: 'Mask',
        label: {
          ru: 'Маска',
          en: 'Mask',
        },
        childs: [
          {
            key: 'maskShow',
            label: {
              ru: 'Включить',
              en: 'Enable',
            },
            element: 'switch',
            defaultValue: settings[MapEViewKey.Mask],
            target: 4,
            help: {
              ru: {
                title: 'Ограничение зоны видимости карты',
                description: `
                <p>
                  Настройка ограничивает просмотр областей карты и делает доступными только выбранные области.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Включен - Территория РФ</li>
                  </ul>
                  <hr />
                  <q>В ближайшее время настройка поменяет свою логику, можно будет выбирать из списка отдельные регионы.</q>
                </p>`,
              },
              en: {
                title: 'Map visibility limit',
                description: `
                 <p>
                   The setting limits the viewing of map areas and makes only selected areas available.
                   <ul>
                     <li><strong>Default value:</strong> Enabled - Territory of the Russian Federation</li>
                   </ul>
                   <hr />
                   <q>In the near future, the setting will change its logic, it will be possible to select individual regions from the list.</q>
                 </p>`,
              },
            },
          },
          {
            key: 'maskOpacity',
            label: {
              ru: 'Плотность',
              en: 'Density',
            },
            col: {
              sm: 12,
              md: 8,
              lg: 6,
            },
            element: 'slider',
            defaultValue: settings[MapEViewKey.MaskOpacity],
            attrs: {
              min: 0,
              max: 1,
              step: 0.1,
              marks: {
                0: '0',
                0.5: '0.5',
                1: '1',
              },
            },
            target: 5,
            help: {
              ru: {
                title: 'Плотность маски',
                description: `
                <p>
                  Процент плотности маски, чем меньше значение, тем прозрачнее маска. 
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 1</li>
                    <li><strong>Минимальное значение:</strong> 0</li>
                    <li><strong>Максимальное значение:</strong> 1</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Map visibility limit',
                description: `
                 <p>
                   The setting limits the viewing of map areas and makes only selected areas available.
                   <ul>
                     <li><strong>Default value:</strong> Enabled - Territory of the Russian Federation</li>
                   </ul>
                   <hr />
                   <q>In the near future, the setting will change its logic, it will be possible to select individual regions from the list.</q>
                 </p>`,
              },
            },
          },
        ],
      },
      {
        key: 'Clustering',
        label: {
          ru: 'Кластеризация',
          en: 'Clustering',
        },
        childs: [
          {
            key: 'clusterShow',
            label: {
              ru: 'Включить',
              en: 'Enable',
            },
            element: 'switch',
            defaultValue: settings[ClusterEViewKey.Show],
            target: 7,
            help: {
              cover: ['clusterShow_0.jpg', 'clusterShow_1.jpg'],
              ru: {
                title: 'Объединение меток в группы',
                description: `
                <p>
                  Несколько меток, расположенные друг от друга на расстоянии установленном в следующей настройке <strong><em>"Радиус"</em></strong>, объединяются в одну метку на которой указывается количество входящих в нее дочерних элементов.
                  <br/>
                  При клике на метку группы произойдет увеличение карты к области расположения входящих в нее меток, и группа разобьется на более мелкие подгруппы или отдельные метки.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Включен</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Grouping markers',
                description: `
                 <p>
                   Several markers, located at a distance from each other set in the following <strong><em>"Radius"</em></strong> setting, are combined into one label, which indicates the number of child elements included in it.
                   <br/>
                   When clicking on a group label, the map will be enlarged to the area where the markers included in it are located, and the group will be divided into smaller subgroups or individual markers.
                   <ul>
                     <li><strong>Default value:</strong> Enabled</li>
                   </ul>
                 </p>`,
              },
            },
          },
          {
            key: 'clusterRadius',
            label: {
              ru: 'Радиус',
              en: 'Radius',
            },
            col: {
              sm: 12,
              md: 10,
              lg: 8,
            },
            element: 'slider',
            defaultValue: settings[ClusterEViewKey.Radius],
            attrs: {
              min: 5,
              max: 100,
              marks: {
                5: '5px',
                25: '25px',
                50: '50px',
                75: '75px',
                100: '100px',
              },
            },
            target: 8,
            help: {
              cover: ['clusterRadius_0.jpg', 'clusterRadius_1.jpg'],
              ru: {
                title: 'Радиус объединения',
                description: `
                <p>
                  Указывается расстояние для объединения с соседней меткой, если их радиусы пересекаются. Измеряется в пикселях на карте.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 75</li>
                    <li><strong>Минимальное значение:</strong> 5</li>
                    <li><strong>Максимальное значение:</strong> 100</li>
                  </ul>
                  <hr />
                  <q>На скриншотах видно, что если указанные радиусы пересекаются, то при отдалении карты 2 метки схлопываются в одну.</q>
                </p>`,
              },
              en: {
                title: 'Merge Radius',
                description: `
                 <p>
                   Specifies the distance to merge with an adjacent label if their radii intersect. Measured in pixels on the map.
                   <ul>
                     <li><strong>Default value:</strong> 75</li>
                     <li><strong>Minimum value:</strong> 5</li>
                     <li><strong>Max value:</strong> 100</li>
                   </ul>
                   <hr />
                   <q>The screenshots show that if the specified radii intersect, then when the map moves away, 2 markers collapse into one.</q>
                 </p>`,
              },
            },
          },
        ],
      },
      {
        key: 'HeatMap',
        label: {
          ru: 'Тепловая карта',
          en: 'Heat map',
        },
        childs: [
          {
            key: 'heatShow',
            label: {
              ru: 'Включить',
              en: 'Enable',
            },
            element: 'switch',
            defaultValue: settings[HeatEViewKey.Show],
            target: 10,
            help: {
              cover: ['heatShow_0.jpg'],
              ru: {
                title: 'Тепловая карта',
                description: `
                <p>
                  Выводит на карте индикацию показателя выбранного в настройке <strong><em>"Показатель"</em></strong> в виде круга радиусом установленном в настройке <strong><em>"Радиус"</em></strong> и цветом выбранном в настройке <strong><em>"Цвет"</em></strong> зависящего от текущего значения.
                  <br/>
                  Если радиусы соседних меток пересекаются, то фигуры объединяются.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Выключен</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Heat Map',
                description: `
                  <p>
                    Displays on the map the indicator of the selection in the <strong><em>"Index"</em></strong> setting as a circle with the radius set in the <strong><em>"Radius"</em></strong> setting and the color selected in the settings <strong><em>"Color"</em></strong> value, on which the value depends.
                    <br/>
                    If marks are measured, then figures are formed.
                    <str>
                      <li><strong>Default value:</strong> Off</li>
                    </ul>
                  </p>`,
              },
            },
          },
          {
            key: 'heatValueH',
            label: {
              ru: 'Показатель',
              en: 'Indicator',
            },
            col: {
              sm: 12,
              md: 8,
              lg: 6,
            },
            element: 'select',
            options: columnsByBlock[EBlockKey.Values].map(({ name }, index) => {
              return {
                label: {
                  ru: name,
                  en: name,
                },
                value: 'val_' + index,
              };
            }),
            defaultValue: settings[HeatEViewKey.ValueH] || '',
            target: 12,
            help: {
              ru: {
                title: 'Сравниваемый показатель',
                description: `
                <p>
                  Выберите показатель на основе которого будут сравниваться все метки и закрашиваться цветом в зависимости от значения этого показателя в метке и цвета выбранного в настройке <strong><em>"Цвет"</em></strong>.
                  <br/>
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Первый показатель из настроенного списка</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Comparable indicator',
                description: `
                 <p>
                 Select an indicator based on which all labels will be compared and colored depending on the value of this indicator in the label and the color selected in the <strong><em>"Color"</em></strong> setting.
                   <br/>
                   <ul>
                     <li><strong>Default value:</strong> The first indicator from the configured list</li>
                   </ul>
                 </p>`,
              },
            },
          },
          {
            key: 'heatRadius',
            label: {
              ru: 'Радиус',
              en: 'Radius',
            },
            col: {
              sm: 12,
              md: 10,
              lg: 8,
            },
            element: 'slider',
            defaultValue: settings[HeatEViewKey.Radius],
            attrs: {
              min: 5,
              max: 100,
              marks: {
                5: '5px',
                25: '25px',
                50: '50px',
                75: '75px',
                100: '100px',
              },
            },
            target: 13,
            help: {
              cover: ['heatRadius_0.jpg'],
              ru: {
                title: 'Радиус цветовой индекации',
                description: `
                <p>
                  Радиус круга с меткой в центре для цветовой индекации. Измеряется в пикселях на карте.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 50</li>
                    <li><strong>Минимальное значение:</strong> 5</li>
                    <li><strong>Максимальное значение:</strong> 100</li>
                  </ul>
                  <hr />
                  <q>На сриншоте более наглядно.</q>
                </p>`,
              },
              en: {
                title: 'Color Indication Radius',
                description: `
                 <p>
                   The radius of the circle with a label in the center for color indication. Measured in pixels on the map.
                   <ul>
                     <li><strong>Default value:</strong> 50</li>
                     <li><strong>Minimum value:</strong> 5</li>
                     <li><strong>Max value:</strong> 100</li>
                   </ul>
                   <hr />
                   <q>Screenshot is more clear.</q>
                 </p>`,
              },
            },
          },
          {
            key: 'heatColor',
            label: {
              ru: 'Цвет',
              en: 'Color',
            },
            col: {
              md: 18,
              lg: 16,
              xl: 16,
            },
            element: 'combo',
            kids: [
              {
                key: 'heatColorMin',
                label: {
                  ru: 'Минимальный',
                  en: 'Minimum',
                },
                element: 'color',
                defaultValue: settings[HeatEViewKey.ColorMin],
                target: 14,
              },
              {
                key: 'heatColorAvg',
                label: {
                  ru: 'Средний',
                  en: 'Average',
                },
                element: 'color',
                defaultValue: settings[HeatEViewKey.ColorAvg],
                target: 15,
              },
              {
                key: 'heatColorMax',
                label: {
                  ru: 'Максимальный',
                  en: 'Maximum',
                },
                element: 'color',
                defaultValue: settings[HeatEViewKey.ColorMax],
                target: 16,
              },
            ],
            defaultValue: true,
            help: {
              cover: ['heatColor_0.jpg'],
              ru: {
                title: 'Цвета для тепловой карты',
                description: `
                <p>
                Выбираются три цвета: <strong>Минимальный</strong>, <strong>Средний</strong> и <strong>Максимальный</strong>. Чем больше значение показателя выбранного в настройке <strong><em>"Показатель"</em></strong> тем больше круг будет заполнен цветом настроенным в подопции <strong>Максимальный</strong>, тоже самое со средними и минимальными значениями.
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> 🔴 🟡 🟢</li>
                  </ul>
                  <hr />
                  <q>На скриншоте показаны метки с разными цветами в зависимости от из значения.</q>
                </p>`,
              },
              en: {
                title: 'Colors for heatmap',
                description: `
                 <p>
                  Three colors are selectable: <strong>Minimum</strong>, <strong>Medium</strong> and <strong>Maximum</strong>. The greater the value of the indicator selected in the <strong><em>"Indicator"</em></strong> setting, the more the circle will be filled with the color set in the <strong>Maximum</strong> suboption, same with average and minimum values.
                    <ul>
                      <li><strong>Default value:</strong> 🔴 🟡 🟢</li>
                    </ul>
                    <hr />
                    <q>The screenshot shows labels with different colors depending on the value.</q>
                 </p>`,
              },
            },
          },
        ],
      },
      {
        key: 'Tooltip',
        label: {
          ru: 'Всплывающие подсказки',
          en: 'Tooltip',
        },
        childs: [
          {
            key: 'tooltipShow',
            label: {
              ru: 'Включить',
              en: 'Enable',
            },
            element: 'switch',
            defaultValue: settings[TooltipEViewKey.Show],
            target: 18,
            help: {
              cover: ['tooltipShow_0.jpg'],
              ru: {
                title: 'Всплывающие подсказки',
                description: `
                <p>
                  При выполнении выбранного в настройке <strong><em>"Условие"</em></strong> действия выводятся подсказки с контентом, настроенным в опции <strong><em>"Контент"</em></strong>.
                  <br/>
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Включен</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Tooltips',
                description: `
                 <p>
                   When an action selected in the <strong><em>"Condition"</em></strong> setting is executed, tooltips are displayed with the content configured in the <strong><em>"Content"</em></strong> option.
                   <br/>
                   <ul>
                     <li><strong>Default value:</strong> Enabled</li>
                   </ul>
                 </p>`,
              },
            },
          },
          {
            key: 'tooltipTriggerOn',
            label: {
              ru: 'Условие',
              en: 'Condition',
            },
            col: {
              sm: 12,
              md: 8,
              lg: 6,
            },
            element: 'select',
            options: [
              {
                label: {
                  ru: 'Наведение мыши',
                  en: 'Mouse move',
                },
                value: 'mouseover',
              },
              {
                label: {
                  ru: 'Клик',
                  en: 'Click',
                },
                value: 'click',
              },
            ],
            defaultValue: settings[TooltipEViewKey.TriggerOn],
            target: 20,
            help: {
              ru: {
                title: 'Условие срабатывания',
                description: `
                <p>
                  При выполнении данного условия на метке по отношению к которой оно было произведено появиться подсказка.
                  <br/>
                  <ul>
                    <li><strong>Значение по умолчанию:</strong> Наведение мыши</li>
                  </ul>
                </p>`,
              },
              en: {
                title: 'Trigger condition',
                description: `
                 <p>
                   When this condition is met, a hint will appear on the label in relation to which it was made.
                   <br/>
                   <ul>
                     <li><strong>Default value:</strong> Mouseover</li>
                   </ul>
                 </p>`,
              },
            },
          },
          {
            key: 'tooltipContent',
            label: {
              ru: 'Контент',
              en: 'Content',
            },
            element: 'textTpls',
            defaultValue: settings[TooltipEViewKey.Content],
            target: 21,
            help: {
              ru: {
                title: '',
                description: '',
              },
              en: {
                title: 'Trigger condition',
                description: '',
              },
            },
          },
        ],
      },
      {
        key: 'Digit',
        label: {
          ru: 'Разрядность значений',
          en: 'Bit depth of values',
        },
        childs: [
          {
            key: 'digitShow',
            label: {
              ru: 'Включить',
              en: 'Enable',
            },
            element: 'switch',
            defaultValue: settings[DigitEViewKey.Show],
            target: 32,
            help: {
              ru: {
                title: 'Разрядность значений',
                description: ``,
              },
              en: {
                title: 'Bitness of values',
                description: ``,
              },
            },
          },
          {
            key: 'digitNumber',
            label: {
              ru: 'Кол-во',
              en: 'Qty',
            },
            element: 'number',
            attrs: {
              min: 0,
              max: 10,
            },
            defaultValue: settings[DigitEViewKey.Number],
            target: 33,
            help: {
              ru: {
                title: 'Кол-во знаков после запятой',
                description: ``,
              },
              en: {
                title: 'Number of decimal places',
                description: ``,
              },
            },
          },
        ],
      },
    ],
  };
};

const hideItems = () => {
  const items = parent.querySelectorAll<HTMLElement>(
    'app-view-options .ant-form-item.ng-star-inserted',
  );

  const hideArr = [12, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30];

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
      const editorSettings = storage('settings').get();
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

      widget.chart();
    });
  }
};
