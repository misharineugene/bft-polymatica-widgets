import { fontSize } from './constants';
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
export class Compare extends Widget implements SingleData {
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
    const valuesSlugToPaths = slugToPath(valuesBlock);
    //
    const newVals = [
      {
        add: settings[EViewKey.IsChange],
        name: settings[EViewKey.ChangeName],
        path: 'col_new_0',
        formula: settings[EViewKey.ChangeFormula],
      },
      {
        add: settings[EViewKey.IsExecution],
        name: settings[EViewKey.ExecutionName],
        path: 'col_new_1',
        formula: settings[EViewKey.ExecutionFormula],
      },
      {
        add: settings[EViewKey.IsRateOfIncrease],
        name: settings[EViewKey.RateOfIncreaseName],
        path: 'col_new_2',
        formula: settings[EViewKey.RateOfIncreaseFormula],
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
    contentNode.innerHTML += getColumn(value1Name, this.toDigital(value1));
    //
    const value2Name = settings[EViewKey.IsValue_2_Name]
      ? settings[EViewKey.Value_2_Name]
      : columnsByBlock[EBlockKey.VALUE_2][0].name;
    const value2 = this.data.reduce((acc, dataItem) => {
      return (acc += dataItem[columnsByBlock[EBlockKey.VALUE_2][0].path]);
    }, 0);
    contentNode.innerHTML += getColumn(value2Name, this.toDigital(value2));
    //
    const nameToValue = {
      [columnsByBlock[EBlockKey.VALUE_1][0].name.toLowerCase()]: value1,
      [columnsByBlock[EBlockKey.VALUE_2][0].name.toLowerCase()]: value2,
      [settings[EViewKey.ChangeName].toLowerCase()]: 0,
      [settings[EViewKey.ExecutionName].toLowerCase()]: 0,
      [settings[EViewKey.RateOfIncreaseName].toLowerCase()]: 0,
    };
    ////////////////////////////////
    if (settings[EViewKey.IsChange]) {
      const changeName = settings[EViewKey.ChangeName];
      const changeColorMax = settings[EViewKey.ChangeColorMax];
      const changeColorThr = settings[EViewKey.ChangeColorThr];
      const changeColorMin = settings[EViewKey.ChangeColorMin];
      const changeColors = getRangeColor(
        [changeColorMin, changeColorMax],
        changeColorThr,
      );
      //
      let formula = settings[EViewKey.ChangeFormula].toLowerCase();
      Object.entries(nameToValue).forEach((entry) => {
        const [key, value] = entry;
        formula = formula.replace(key, value);
      });
      nameToValue[changeName.toLowerCase()] = calculate(formula);
      const changeValue = nameToValue[changeName.toLowerCase()];
      //
      let style = '';
      if (getIsValue(changeValue)) {
        const valuePercent = Math.abs(
          Math.round((changeValue * 100) / changeColors.max),
        );
        const currentColor = changeColors.colors[valuePercent];
        //
        if (currentColor) {
          style = `color: ${currentColor}`;
        }
      }

      contentNode.innerHTML += getColumn(
        changeName,
        getIsValue(changeValue)
          ? (changeValue > 0 ? '+' : '') + this.toDigital(changeValue)
          : '',
        style,
      );
    }
    ////////////////////////////////
    if (settings[EViewKey.IsExecution]) {
      const executionName = settings[EViewKey.ExecutionName];
      const executionColorMax = settings[EViewKey.ExecutionColorMax];
      const executionColorThr = settings[EViewKey.ExecutionColorThr];
      const executionColorMin = settings[EViewKey.ExecutionColorMin];
      const executionColors = getRangeColor(
        [executionColorMin, executionColorMax],
        executionColorThr,
      );
      //
      let formula = settings[EViewKey.ExecutionFormula].toLowerCase();
      Object.entries(nameToValue).forEach((entry) => {
        const [key, value] = entry;
        formula = formula.replace(key, value);
      });
      nameToValue[executionName.toLowerCase()] = calculate(formula);
      const executionValue = nameToValue[executionName.toLowerCase()];
      //
      let style = '';
      if (getIsValue(executionValue)) {
        const valuePercent = Math.abs(
          Math.round((executionValue * 100) / executionColors.max),
        );
        const currentColor = executionColors.colors[valuePercent];
        //
        if (currentColor) {
          style = `color: ${currentColor}`;
        }
      }

      contentNode.innerHTML += getColumn(
        executionName,
        getIsValue(executionValue)
          ? (executionValue > 0 ? '+' : '') +
              this.toDigital(executionValue) +
              '%'
          : '',
        style,
      );
    }
    ////////////////////////////////
    if (settings[EViewKey.IsRateOfIncrease]) {
      const rateOfIncreaseName = settings[EViewKey.RateOfIncreaseName];
      //
      const rateOfIncreaseColorMax = settings[EViewKey.RateOfIncreaseColorMax];
      const rateOfIncreaseColorThr = settings[EViewKey.RateOfIncreaseColorThr];
      const rateOfIncreaseColorMin = settings[EViewKey.RateOfIncreaseColorMin];
      const rateOfIncreaseColors = getRangeColor(
        [rateOfIncreaseColorMin, rateOfIncreaseColorMax],
        rateOfIncreaseColorThr,
      );
      //
      let formula = settings[EViewKey.RateOfIncreaseFormula].toLowerCase();
      Object.entries(nameToValue).forEach((entry) => {
        const [key, value] = entry;
        formula = formula.replace(key, value);
      });
      nameToValue[rateOfIncreaseName.toLowerCase()] = calculate(formula);
      const rateOfIncreaseValue = nameToValue[rateOfIncreaseName.toLowerCase()];
      //
      let style = '';
      if (getIsValue(rateOfIncreaseValue)) {
        const valuePercent = Math.abs(
          Math.round((rateOfIncreaseValue * 100) / rateOfIncreaseColors.max),
        );
        const currentColor = rateOfIncreaseColors.colors[valuePercent];
        //
        if (currentColor) {
          style = `color: ${currentColor}`;
        }
      }

      contentNode.innerHTML += getColumn(
        rateOfIncreaseName,
        getIsValue(rateOfIncreaseValue)
          ? (rateOfIncreaseValue > 0 ? '+' : '') +
              this.toDigital(rateOfIncreaseValue) +
              '%'
          : '',
        style,
      );
    }

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

  private compareInit = () => {
    const settings = this.viewSettings;

    this.getChartOptions();
  };

  private chartInit = () => {
    this.setChartId();
    this.initDataset();
    //
    this.compareInit();
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
