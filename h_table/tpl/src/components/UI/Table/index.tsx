import { FC } from 'react';
//
import { Table as AntdTable } from 'antd';
//
import { IState } from './type';
//
import cn from 'classnames';
import styles from './styles.module.scss';

type TableProps = {
  state: IState;
};

const Table: FC<TableProps> = ({ state }) => {
  const { columns, dataSource, options } = state;

  return (
    <div
      className={cn(styles.htable, styles[`theme--${options.theme}`], {
        [styles.anywhere]: options.anywhere,
      })}
    >
      <AntdTable
        dataSource={dataSource}
        columns={columns}
        defaultExpandedRowKeys={options.defaultExpandedRowKeys}
        //
        bordered
        pagination={false}
        showSorterTooltip={false}
      />
    </div>
  );
};

export default Table;
