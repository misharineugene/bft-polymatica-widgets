import { createElement, Fragment } from 'react';
//
import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';
import { Filter, FilterMethod, Target } from 'ptnl-constructor-sdk/data';
//
import { EBlockKey, EViewKey } from './enum';
//
import {
  toSlug,
  unique,
  filter,
  sort,
  getChildrenByLevel,
  nameToPath,
  slugToPath,
  nameToType,
  toStrong,
  toNumber,
  slugToType,
  getKey,
  calculate,
  getRangeColor,
  toTag,
  createDeepCopy,
  getIsValue,
} from './utils';
import { colType, rowType } from './types';

@Declare({
  provideCssVariables: true,
})
export class HTable extends Widget implements SingleData {
  readonly data!: SingleData['data'];
  readonly dataSettings!: SingleData['dataSettings'];

  private chartType = 'Table';
  //
  private filteredData: any;
  private chartId: string;
  private config: string;
  private textStyle: string;
  //
  private defaultOpen: string[] = [];

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

  private getFilteredRows = (rows, rowsPaths) =>
    rows.reduce((acc, row, index) => {
      acc[index] = {};

      row.rows.forEach((rowName) => {
        acc[index][rowName] = filter(this.data, rowName, rowsPaths[index]);
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

  private toTotal = (value) => {
    const settings = this.viewSettings;
    const totalTag = settings[EViewKey.TotalTag];

    return toStrong(this.toDigital(value), {
      className: totalTag ? 'total tag' : 'total',
    });
  };

  private getChartDataset = () => {
    const settings = this.viewSettings;
    const { columnsByBlock } = this.dataSettings;
    //
    const firstColName = settings[EViewKey.FirstColName];
    //
    const defaultOpenLvl = +settings[EViewKey.DefaultOpenLvl];
    const defaultExpandAllRows =
      defaultOpenLvl === columnsByBlock[EBlockKey.ROWS].length - 1;
    //
    const total = settings[EViewKey.Total];
    //
    const allTotals = total === 'all';
    const colsTotals = total !== 'none' && total !== 'rows';
    const rowsTotals = total !== 'none' && total !== 'cols';
    //
    const colTotalH = settings[EViewKey.TotalH];
    const rowTotalV = settings[EViewKey.TotalV];
    //
    const colTotalFixed = settings[EViewKey.TotalHFixed];
    const rowTotalFixed = settings[EViewKey.TotalVFixed];
    //
    const totalPaging = settings[EViewKey.TotalPaging];
    //
    const pagination = settings[EViewKey.Pagination];
    const pageSize = +settings[EViewKey.PageSize];
    //
    const firstColWidth = +settings[EViewKey.FirstColWidth];
    const contentWidth = +settings[EViewKey.ContentWidth];
    const totalColWidth = +settings[EViewKey.TotalColWidth];
    //
    this.defaultOpen = [];
    let currentPage = 0;
    let currentVal = 0;
    let allT = 0;
    let firstColumn = null;
    let nameColumn = {
      title: createElement(Fragment, {
        children: [
          createElement('span', { children: firstColName }),
          createElement('span', { style: { width: 32 } }),
          createElement('span', { children: 'Показатель' }),
        ],
      }),
      dataIndex: 'name',
      key: 'name',
      width: firstColWidth,
      sorter: (a, b) => sort(a.name, b.name, true),
      render: (text) => toStrong(text, { className: 'name' }),
    };
    let totalColumn = {
      title: 'Всего',
      dataIndex: 'total',
      key: 'total',
      align: colTotalH,
      ...(colTotalFixed && {
        fixed: colTotalH,
      }),
      width: totalColWidth,
      sorter: (a, b) => sort(a.total, b.total),
    };
    let totalRow = {
      name: 'Всего',
      key: getKey(),
      total: '',
    };
    const totalRowPag = [];
    //
    const columnsBlock = columnsByBlock[EBlockKey.COLUMNS];
    const rowsBlock = columnsByBlock[EBlockKey.ROWS];
    const valuesBlock = columnsByBlock[EBlockKey.VALUES];
    const valuesNoTotalBlock = columnsByBlock[EBlockKey.VALUES_NO_TOTAL];
    //
    const columnsPaths = columnsBlock.map((item) => item.path);
    const rowsPaths = rowsBlock.map((item) => item.path);
    const valuesPaths = valuesBlock.map((item) => item.path);
    const valuesNoTotalPaths = valuesNoTotalBlock.map((item) => item.path);
    //
    const columnsNames = columnsBlock.map((item) => item.name);
    const rowsNames = rowsBlock.map((item) => item.name);
    const valuesNames = valuesBlock.map((item) => item.name);
    //
    const valuesNameToPath = nameToPath(valuesBlock);
    const valuesSlugToPath = slugToPath(valuesBlock);
    const valuesNameToType = nameToType(valuesBlock);
    const valuesSlugToType = slugToType(valuesBlock);
    const valuesSlugToColor = {};
    //
    const uniqueNamesByPath = this.getUniqueValuesByPath([
      ...columnsPaths,
      ...rowsPaths,
    ]);
    //
    const newValsCount = +settings[EViewKey.newValsCount];
    const newValsPlus = [];
    //
    for (let i = 0; i < newValsCount; i++) {
      let name = settings[EViewKey['newValName_' + i]];
      if (typeof name !== 'undefined') {
        const path = 'col_new_' + i;
        //
        if (name.includes('(+)')) {
          newValsPlus.push(path);
          //
          name = name.replace('(+)', '');
          name = name.trim();
        }
        //
        const formula = settings[EViewKey['newValFormula_' + i]].toLowerCase();
        const formula_arr = formula.split(/ \+ | - | \* | \/ /g);
        const totalHide = settings[EViewKey['newValTotal_' + i]];
        const slug = toSlug(name);
        //
        const isTag = settings[EViewKey['newValColor_' + i]];
        const color_min = settings[EViewKey['newValColorMin_' + i]];
        const color_thr = settings[EViewKey['newValColorThr_' + i]];
        const color_max = settings[EViewKey['newValColorMax_' + i]];
        const colors = getRangeColor(isTag, [color_min, color_max], color_thr);

        valuesPaths.push(path);
        valuesNames.push(name);
        valuesNameToPath[name] = path;
        valuesSlugToPath[slug] = path;
        valuesNameToType[name] = 'number';
        valuesSlugToType[slug] = 'number';
        valuesSlugToColor[slug] = colors;

        if (totalHide) {
          valuesNoTotalPaths.push(path);
        }

        let formulaL = formula;
        const paths = [];

        valuesNames.forEach((valName) => {
          formula_arr.forEach((item) => {
            if (valName.toLowerCase() === item) {
              paths.push(valuesNameToPath[valName]);
            }
          });

          formulaL = formulaL.replace(
            valName.toLowerCase(),
            valuesNameToPath[valName],
          );
        });

        this.data.forEach((dataItem) => {
          let newFormula = formulaL;
          paths.forEach((path) => {
            newFormula = newFormula.replace(path, dataItem[path]);
          });

          dataItem[path] = calculate(newFormula);
        });
      }
    }

    const columns: colType[] = columnsPaths.map((pathItem, index) => {
      const cols = uniqueNamesByPath[pathItem];

      return {
        name: columnsNames[index],
        cols,
        paths: new Array(cols.length).fill(pathItem),
      };
    });

    const rows: rowType[] = rowsPaths.map((pathItem, index) => {
      const rows = uniqueNamesByPath[pathItem];

      return {
        name: rowsNames[index],
        rows,
        paths: new Array(rows.length).fill(pathItem),
      };
    });

    columns.push({
      name: 'Показатель',
      cols: valuesNames,
      paths: valuesPaths,
    });

    const colsEach = (column, acc, item, condition) => {
      column.cols.forEach((colName, colIndex) => {
        const path = column.paths[colIndex];
        const name = item.name ? item.name + '__' + colName : colName;
        const slug = toSlug(colName);
        const data = condition ? item.data : filter(item.data, colName, path);
        //
        if (condition) {
          acc.push(name);
          if (colsTotals) totalRowRender(data, path, name, slug);
        } else if (data.length) {
          acc.push({
            name,
            data,
          });
        }
      });
    };

    const totalColRender = (row) => {
      let haveVals = false;

      const total = Object.keys(row).reduce((acc, key) => {
        const valSlug = key.split('__').pop();
        const valPath = valuesSlugToPath[valSlug];
        const isSum =
          !valuesNoTotalPaths.includes(valPath) &&
          valuesSlugToType[valSlug] === 'number';

        if (isSum) {
          haveVals = true;
          const value = toNumber(row[key]);
          if (getIsValue(value, newValsPlus.includes(valPath))) {
            return (acc += value);
          }
          return acc;
        }

        return acc;
      }, 0);

      row['total'] = haveVals ? this.toTotal(total) : '';
    };

    const totalRowRender = (col, path, name, slug) => {
      const isSum =
        !valuesNoTotalPaths.includes(path) &&
        valuesSlugToType[slug] === 'number';
      if (isSum) {
        const total = col.reduce((accData, dataItem) => {
          return (accData += dataItem[path]);
        }, 0);

        if (getIsValue(total, newValsPlus.includes(path))) {
          allT += total;
          totalRow[toSlug(name)] = this.toTotal(total);
        } else {
          totalRow[toSlug(name)] = '';
        }
      } else {
        totalRow[toSlug(name)] = '';
      }
    };

    const totalRowPagGen = (index, slug, value) => {
      if (totalPaging === 'sub') {
        if (!totalRowPag[currentPage]) totalRowPag.push({});
        if (!totalRowPag[currentPage][slug]) totalRowPag[currentPage][slug] = 0;

        totalRowPag[currentPage][slug] += toNumber(value);
      } else {
        if (!totalRowPag[currentPage]) totalRowPag.push(totalRow);
      }

      if (index !== 0 && (index + 1) % pageSize === 0) {
        if (currentVal === valuesBlock.length - 1) {
          currentVal = 0;
          currentPage += 1;
        } else {
          currentVal += 1;
        }
      }
    };

    const labels = columns.reduce((acc, column, index, arr) => {
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;
      const isOnce = arr.length === 1;
      const childItem = {
        title: column.name,
        children: [],
      };

      if (isFirst) {
        firstColumn = isOnce ? nameColumn : childItem;

        colsEach(column, acc, { data: this.data }, isOnce);
      } else {
        const newAcc = [];
        const children = getChildrenByLevel(firstColumn, index);
        children.push(isLast ? nameColumn : childItem);

        acc.forEach((item) => colsEach(column, newAcc, item, isLast));
        acc = newAcc;
      }

      return acc;
    }, []);

    const h_width = columns.reduce((acc, item, index, arr) => {
      const isFirst = index === 0;
      const isOnce = arr.length === 1;
      const length = item.cols.length;

      if (isOnce || isFirst) {
        acc[index] = contentWidth / length;
      } else {
        acc[index] = acc[index - 1] / length;
      }

      return acc;
    }, {});

    const h_lastColsWidth = Object.values(h_width).reverse()[0];

    const h_columns = labels.reduce((acc, label) => {
      const labelArr = label.split('__');

      labelArr.forEach((_, index, arr) => {
        const isLast = index === arr.length - 1;

        const findCol = (ref, findIdx) => {
          const isFirst = findIdx === 0;

          ref = isFirst ? ref : ref.children;

          const findItem = ref.find((refItem) => {
            return refItem.title === labelArr[findIdx];
          });

          if (!findItem) {
            const name = labelArr[findIdx];
            const slug = toSlug(label);

            ref.push({
              title: name,
              key: slug,
              dataIndex: slug,
              align: 'right',
              ...(isLast && {
                width: h_lastColsWidth,
                sorter: (a, b) =>
                  sort(a[slug], b[slug], valuesNameToType[name] !== 'number'),
              }),
              ...(!isLast && {
                children: [],
              }),
            });
          }

          if (findIdx < index) {
            findCol(findItem || ref, ++findIdx);
          } else {
            return findItem || ref;
          }
        };

        findCol(acc, 0);
      });

      return acc;
    }, []);

    const setRowData = (filtered, level, lvlRowIndex?) => {
      const lastLevel = rows.length - 1;

      return labels.reduce((data, label, index, arr) => {
        const isLast = index === arr.length - 1;
        const slug = toSlug(label);
        //
        const labelArr = label.split('__');
        const valName = labelArr.pop();
        const valPath = valuesNameToPath[valName];
        const valType = valuesNameToType[valName];
        const valIsNew = valPath.includes('col_new_');
        const valColor = valIsNew ? valuesSlugToColor[toSlug(valName)] : {};

        const valHideLevel = settings[`HideValue_${valPath}`];
        const valHideLevelExist = typeof valHideLevel !== 'undefined';

        const items = columnsPaths.reduce(
          (itemsAcc, path, pathIndex) =>
            filter(itemsAcc, labelArr[pathIndex], path),
          filtered,
        );

        if (
          (items.length && !valHideLevelExist) ||
          (items.length && valHideLevelExist && level >= +valHideLevel)
        ) {
          let value = items[0][valPath];
          let valuePercent = 1;
          let isValue = false;

          if (valType === 'number') {
            value = items.reduce(
              (itemsAcc, item) => (itemsAcc += item[valPath]),
              0,
            );

            if (getIsValue(value, newValsPlus.includes(valPath))) {
              isValue = true;

              valuePercent =
                valIsNew && value <= valColor.max && value >= valColor.min
                  ? Math.round((value * 100) / valColor.max)
                  : 100;
              value = this.toDigital(value);
            }
          }

          if (isValue) {
            if (level === 0 && colsTotals && pagination)
              totalRowPagGen(lvlRowIndex, slug, value);

            const color = valIsNew ? valColor.colors[valuePercent] : '';
            const isStrong = level !== lastLevel;

            value =
              valIsNew && valColor.isTag && color
                ? toTag(value, color, isStrong)
                : isStrong
                ? toStrong(value)
                : value;

            data[slug] = value;
          } else {
            data[slug] = '';
          }
        } else {
          data[slug] = '';
        }

        if (rowsTotals && isLast) totalColRender(data);

        return data;
      }, {});
    };

    const filteredRows = this.getFilteredRows(rows, rowsPaths);

    let h_rows = rows.reduceRight((acc, row, index, arr) => {
      const isFirst = index === arr.length - 1;
      const isOnce = arr.length === 1;
      const prevLvl = [...acc];

      acc = [];

      row.rows.forEach((rowName, rowIndex) => {
        const key = getKey();
        const filtered = filteredRows[index][rowName];
        const isRight = (!isFirst && !isOnce) || isOnce;

        if (!defaultExpandAllRows && index < defaultOpenLvl) {
          this.defaultOpen.push(key);
        }

        acc.push({
          key: key,
          name: rowName,
          ...(!isFirst && {
            children: prevLvl.reduce((prevAcc, child) => {
              const newKey = getKey();
              const prevFiltered = filter(
                filtered,
                child.name,
                arr[index + 1].paths[0],
              );

              if (prevFiltered.length) {
                prevAcc.push({
                  ...child,
                  ...setRowData(prevFiltered, index + 1),
                  key: newKey,
                });

                if (!defaultExpandAllRows && index + 1 < defaultOpenLvl) {
                  this.defaultOpen.push(newKey);
                }
              }

              return prevAcc;
            }, []),
          }),
          ...(isRight && setRowData(filtered, index, rowIndex)),
        });
      });

      return acc;
    }, []);

    if (allTotals) {
      totalRow = {
        ...totalRow,
        total: this.toTotal(allT * 2),
      };
    }

    if (rowsTotals) {
      colTotalH === 'right'
        ? h_columns.push(totalColumn)
        : h_columns.unshift(totalColumn);
    }

    h_columns.unshift(firstColumn);

    if (colsTotals) {
      if (pagination) {
        totalRowPag.forEach((item, index) => {
          const idx =
            (rowTotalV === 'top' ? index : index + 1) * pageSize + index;

          if (totalPaging === 'sub') {
            let total = 0;

            const newItem = Object.keys(item).reduce((acc, key) => {
              const value = item[key];
              acc[key] = this.toTotal(value);
              total += value;

              return acc;
            }, {});

            const totalRowSub = {
              name: 'Всего',
              key: getKey(),
              ...(allTotals && {
                total: this.toTotal(total * 2),
              }),
              ...newItem,
            };

            h_rows.splice(idx, 0, totalRowSub);
          } else {
            h_rows.splice(idx, 0, totalRow);
          }
        });
      } else {
        rowTotalV === 'bottom'
          ? h_rows.push(totalRow)
          : h_rows.unshift(totalRow);
      }
    }

    const getTableWidth = () => {
      const minWidth = 720;
      let result = 0;

      result += firstColWidth;

      result += contentWidth;
      //
      if (colsTotals) result += totalColWidth;

      return result < minWidth ? minWidth : result;
    };

    if (defaultExpandAllRows) {
      h_rows = createDeepCopy(h_rows);
      let rowIndex = 0;
      const changeKeys = (rows) => {
        rows.forEach((row) => {
          row.key = rowIndex;
          rowIndex++;
          if (row.children) changeKeys(row.children);
        });
      };

      changeKeys(h_rows);
    }

    const dataset = {
      columns: h_columns,
      dataSource: h_rows,
      options: {
        theme: 'default',
        anywhere: false,
        defaultExpandAllRows: defaultExpandAllRows,
        defaultExpandedRowKeys: this.defaultOpen,
        pagination: pagination && {
          pageSize: colsTotals ? pageSize + 1 : pageSize,
          total:
            rows[0].rows.length +
            (colsTotals ? Math.ceil(rows[0].rows.length / pageSize) : 0),
        },
        tableWidth: getTableWidth(),
        rowTotalFixed: colsTotals && rowTotalFixed,
        rowTotalV: rowTotalV,
      },
    };

    this.filteredData = dataset;

    // console.log('<< dataset >>', dataset);

    return dataset;
  };

  private getChartOptions() {
    const settings = this.viewSettings;
    //
    const headColor = settings[EViewKey.HeadColor];
    //
    const filteredData = this.filteredData;
    const isFirst = !window['h_table'];
    //
    if (isFirst) window['h_table'] = {};
    //
    window['h_table']['state'] = filteredData;

    if (isFirst) {
      const interval = setInterval(() => {
        // @ts-ignore
        if (runTpl()) clearInterval(interval);
      }, 300);
    }

    const style = document.createElement('style');
    style.innerText = `
            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td:first-child {
                background: ${headColor} !important
            };
        `;

    document.head.append(style);
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

  private tableInit = () => {
    const settings = this.viewSettings;

    this.getChartOptions();
  };

  private chartInit = () => {
    this.setChartId();
    this.initDataset();
    //
    this.tableInit();
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
