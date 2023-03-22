import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';
import { Filter, FilterMethod, Target } from 'ptnl-constructor-sdk/data';
//
import { EBlockKey, EViewKey } from './enum';
import {
  unique,
  toSlug,
  nameToPath,
  slugToPath,
  calculate,
  getColumn,
  getRangeColor,
  getIsValue,
  getTitle,
} from './utils';

@Declare({
  provideCssVariables: true,
})
export class Indicator extends Widget implements SingleData {
  readonly data!: SingleData['data'];
  readonly dataSettings!: SingleData['dataSettings'];

  private chartType = 'Table';
  //
  private filteredData: any;
  private chartId: string;
  private config: string;
  private textStyle: string;

  private getFilteredData = (filter: Filter): void => {};

  private getUniqueValuesByPath = (paths) =>
    this.data.reduce((acc, item, index, arr) => {
      const isLast = index === arr.length - 1;

      Object.keys(item).forEach((key) => {
        const isRight = paths.includes(key);
        //
        if (!acc[key] && isRight) acc[key] = [];
        //
        if (isRight) acc[key].push(item[key]);
        //
        if (isLast && isRight) acc[key] = unique(acc[key]);
      });

      return acc;
    }, {});

  private toDigital = (value) => {
    const settings = this.viewSettings;
    const digitalShow = settings[EViewKey.Digital];
    const digitalNum = Number(settings[EViewKey.DigitalNum]);

    if (digitalShow) {
      if (!isNaN(digitalNum) && typeof digitalNum === 'number') {
        return value
          .toFixed(digitalNum)
          .split('.')
          .map((item, index) => {
            return index === 0 ? (+item).toLocaleString() : item;
          })
          .join(',');
      }
    }

    return value.toLocaleString();
  };

  private getChartDataset = () => {
    const settings = this.viewSettings;
    const { columnsByBlock } = this.dataSettings;
    //
    const valuesBlock = [
      columnsByBlock[EBlockKey.VALUE_1][0],
      columnsByBlock[EBlockKey.VALUE_2][0],
    ];
    const valuesPaths = valuesBlock.map((item) => item.path);
    const valuesNames = valuesBlock.map((item) => item.name);
    const valuesNameToPaths = nameToPath(valuesBlock);
    //
    const newVals = [
      {
        add: settings[EViewKey.IsNewValue_0],
        name: settings[EViewKey.NewValueName_0],
        path: 'col_new_0',
        formula: settings[EViewKey.NewValueFormula_0],
      },
      {
        add: settings[EViewKey.IsNewValue_1],
        name: settings[EViewKey.NewValueName_1],
        path: 'col_new_1',
        formula: settings[EViewKey.NewValueFormula_1],
      },
      {
        add: settings[EViewKey.IsNewValue_2],
        name: settings[EViewKey.NewValueName_2],
        path: 'col_new_2',
        formula: settings[EViewKey.NewValueFormula_2],
      },
    ];
    //
    newVals.forEach((valItem, index) => {
      if (valItem.add) {
        const formula = valItem.formula.toLowerCase();
        const formula_arr = formula.split(/ \+ | - | \* | \/ /g);
        const path = 'col_new_' + index;
        //
        let formulaL = formula;

        valuesNames.forEach((valName) => {
          formula_arr.forEach((item) => {
            if (valName.toLowerCase() === item) {
              valuesPaths.push(valuesNameToPaths[valName]);
            }
          });

          formulaL = formulaL.replace(
            valName.toLowerCase(),
            valuesNameToPaths[valName],
          );
        });

        this.data.forEach((dataItem) => {
          let newFormula = formulaL;
          valuesPaths.forEach((path) => {
            newFormula = newFormula.replace(path, dataItem[path]);
          });

          dataItem[path] = calculate(newFormula);
        });
      }
    });

    const dataset = {};

    this.filteredData = dataset;

    return dataset;
  };

  private getChartOptions() {
    const settings = this.viewSettings;
    const { columnsByBlock } = this.dataSettings;
    //
    const filteredData = this.filteredData;
    //
    const root: HTMLElement = document.getElementById('root');
    root.innerHTML = '';

    if (settings[EViewKey.TitleShow] && settings[EViewKey.TitleText]) {
      root.innerHTML += getTitle(
        settings[EViewKey.TitleText],
        settings[EViewKey.TitleFontSize],
      );
    }

    const contentNode = document.createElement('div');
    contentNode.classList.add('root');

    //
    const value1Name = settings[EViewKey.IsValue_1_Name]
      ? settings[EViewKey.Value_1_Name]
      : columnsByBlock[EBlockKey.VALUE_1][0].name;
    const value1 = this.data.reduce((acc, dataItem) => {
      return (acc += dataItem[columnsByBlock[EBlockKey.VALUE_1][0].path]);
    }, 0);
    if (!settings[EViewKey.IsValue_1]) {
      const [prefix = '', postfix = ''] =
        settings[EViewKey.Value_1_PrefixPostfix].split('|');
      contentNode.innerHTML += getColumn(
        value1Name,
        prefix + this.toDigital(value1) + postfix,
        settings[EViewKey.Value_1_FontSize],
      );
    }
    //
    const value2Name = settings[EViewKey.IsValue_2_Name]
      ? settings[EViewKey.Value_2_Name]
      : columnsByBlock[EBlockKey.VALUE_2][0].name;
    const value2 = this.data.reduce((acc, dataItem) => {
      return (acc += dataItem[columnsByBlock[EBlockKey.VALUE_2][0].path]);
    }, 0);
    if (!settings[EViewKey.IsValue_2]) {
      const [prefix = '', postfix = ''] =
        settings[EViewKey.Value_2_PrefixPostfix].split('|');
      contentNode.innerHTML += getColumn(
        value2Name,
        prefix + this.toDigital(value2) + postfix,
        settings[EViewKey.Value_2_FontSize],
      );
    }
    //
    const name1 = settings[EViewKey.IsValue_1_Name]
      ? settings[EViewKey.Value_1_Name] ||
        columnsByBlock[EBlockKey.VALUE_1][0].name
      : columnsByBlock[EBlockKey.VALUE_1][0].name;
    const name2 = settings[EViewKey.IsValue_2_Name]
      ? settings[EViewKey.Value_2_Name] ||
        columnsByBlock[EBlockKey.VALUE_2][0].name
      : columnsByBlock[EBlockKey.VALUE_2][0].name;

    const count = 3;
    const nameToValue = {
      [name1.toLowerCase()]: value1,
      [name2.toLowerCase()]: value2,
      [settings[EViewKey.NewValueName_0].toLowerCase()]: 0,
      [settings[EViewKey.NewValueName_1].toLowerCase()]: 0,
      [settings[EViewKey.NewValueName_2].toLowerCase()]: 0,
    };
    ////////////////////////////////
    for (let i = 0; i < count; i++) {
      if (!settings[EViewKey[`IsNewValue_${i}`]]) {
        const NewValueName = settings[EViewKey[`NewValueName_${i}`]];
        const NewValueColorMax = settings[EViewKey[`NewValueColorMax_${i}`]];
        const NewValueColorThr = settings[EViewKey[`NewValueColorThr_${i}`]];
        const NewValueColorMin = settings[EViewKey[`NewValueColorMin_${i}`]];
        const NewValueColors = getRangeColor(
          [NewValueColorMin, NewValueColorMax],
          NewValueColorThr,
        );
        //
        let formula = settings[EViewKey[`NewValueFormula_${i}`]].toLowerCase();
        Object.entries(nameToValue).forEach((entry) => {
          const [key, value] = entry;
          formula = formula.replace(key, value);
        });
        nameToValue[NewValueName.toLowerCase()] = calculate(formula);
        const NewValueValue = nameToValue[NewValueName.toLowerCase()];
        //
        let style = '';
        if (getIsValue(NewValueValue)) {
          const valuePercent = Math.abs(
            Math.round((NewValueValue * 100) / NewValueColors.max),
          );
          const currentColor = NewValueColors.colors[valuePercent];
          //
          if (currentColor) {
            style = `color: ${currentColor}`;
          }
        }

        const [prefix = '', postfix = ''] =
          settings[EViewKey[`NewValuePrefixPostfix_${i}`]].split('|');

        contentNode.innerHTML += getColumn(
          NewValueName,
          getIsValue(NewValueValue)
            ? prefix + this.toDigital(NewValueValue) + postfix
            : '',
          settings[EViewKey[`NewValueFontSize_${i}`]],
          style,
        );
      }
    }
    ////////////////////////////////
    root.innerHTML += contentNode.outerHTML;
  }

  private setChartId = () => {
    const type = this.chartType;
    const path = location.pathname;
    const id = path.includes('custom_widget') ? path : 'default';

    this.chartId = `${type}_${id}`;
  };

  private initDataset = () => {
    this.getChartDataset();
  };

  private indicatorInit = () => {
    const settings = this.viewSettings;

    this.getChartOptions();
  };

  private chartInit = () => {
    this.setChartId();
    this.initDataset();
    //
    this.indicatorInit();
  };

  private chart = () => {
    this.chartInit();

    return true;
  };

  onLangChange(): void {
    this.getChartOptions();
  }

  onThemeChange(): void {
    this.getChartOptions();
  }

  onChange(): void {
    this.chart();

    this.ready();
  }

  onInit(): void {
    const settings = this.viewSettings;

    this.dataSettings.events.onOtherFilterChange = (filter) => {
      this.getFilteredData(filter);
      this.getChartOptions();
    };
  }
}
