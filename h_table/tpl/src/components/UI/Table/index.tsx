import { FC, useEffect, useRef, useState } from 'react';
//
import { Empty, Table as AntdTable } from 'antd';
//
import { IState } from './type';
//
import cn from 'classnames';
import styles from './styles.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';

type TableProps = {
  state: IState;
};

const Table: FC<TableProps> = ({ state }) => {
  const { columns, dataSource, options } = state;
  const ref = useRef(null);
  const [_, windowHeight] = useWindowSize();

  useEffect(() => {
    //@ts-ignore
    const table = ref.current.querySelector('.ant-table-container');
    const tableHead: HTMLElement = table.querySelector('.ant-table-header');
    const tableBody: HTMLElement = table.querySelector('.ant-table-body');
    //
    const tablePag =
      options.pagination && table.querySelector('.ant-table-pagination');
    const headHeight = tableHead.clientHeight;
    const pagHeight = tablePag ? tablePag.clientHeight : 0;
    const maxHeight = windowHeight - headHeight - pagHeight;

    tableBody.style.maxHeight = maxHeight + 'px';
  }, [windowHeight]);

  return (
    <div
      className={cn(styles.htable, styles[`theme--${options.theme}`], {
        [styles['fixed-row']]: options.rowTotalFixed,
        [styles['fixed-row--top']]:
          options.rowTotalFixed && options.rowTotalV === 'top',
        [styles['fixed-row--bottom']]:
          options.rowTotalFixed && options.rowTotalV === 'bottom',
      })}
      ref={ref}
    >
      <AntdTable
        dataSource={dataSource}
        columns={columns}
        defaultExpandedRowKeys={options.defaultExpandedRowKeys}
        locale={{ emptyText: <Empty description="Нет данных" /> }}
        //
        bordered
        pagination={options.pagination}
        showSorterTooltip={false}
        scroll={{
          x: options.tableWidth,
          y: windowHeight * 0.75,
        }}
      />
    </div>
  );
};

export default Table;
