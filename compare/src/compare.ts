import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';
import { Filter, FilterMethod, Target } from 'ptnl-constructor-sdk/data';
//
import { EBlockKey, EViewKey } from './enum';
import { unique } from './utils';

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

    const dataset = {};

    this.filteredData = dataset;

    console.log('<< dataset >>', dataset);

    return dataset;
  };

  private getChartOptions() {
    const settings = this.viewSettings;
    //
    const filteredData = this.filteredData;
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
