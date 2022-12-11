import { TablePaginationConfig } from 'antd';
import { Key, ReactElement } from 'react';

type ColumnType = {
  key: Key;
  title: ReactElement;
  dataIndex: string;
  sorter?: ((a: DataItem, b: DataItem) => number) | boolean;
};

type ColumnsType = ColumnType & {
  children?: ColumnType[];
};

type DataItem = {
  key: Key;
  name: ReactElement;
  total: ReactElement;
} & {
  [key: string]: ReactElement;
};

type DataSourceType = DataItem & {
  children?: DataItem[];
};

export interface IState {
  columns: ColumnsType[];
  dataSource: DataSourceType[];
  options: {
    theme: string;
    anywhere: boolean;
    defaultExpandedRowKeys: Key[];
    pagination: false | TablePaginationConfig;
    tableWidth: number | string;
    rowTotalFixed: boolean;
    rowTotalV: 'top' | 'bottom';
  };
}
