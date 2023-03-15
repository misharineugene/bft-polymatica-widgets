import { useState, ReactNode, useContext } from 'react';
//
import { Collapse as AntdCollapse, Tooltip } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
//
import PanelInner from '../Collapse/PanelInner';
// hooks
import { useTranslation } from 'react-i18next';
import { useAppState } from '../../hooks/useAppState';
// types
import { keyType } from '../../types';
// utils
import { Context } from '../../utils/getContext';
//
const { Panel } = AntdCollapse;

const Collapse = () => {
  const { t } = useTranslation();
  const { settings } = useAppState();
  const { lang } = useContext(Context);
  const [activeKey, setActiveKey] = useState<keyType>([]);
  const [help, setHelp] = useState('none');

  const genHeader = (header: ReactNode) => {
    return <strong>{header}</strong>;
  };

  const genExtra = (key: string) => {
    return (
      <div
        className="helpBtn"
        onClick={(event) => {
          event.stopPropagation();
          setActiveKey(key);
          setTimeout(() => {
            setHelp(key);
          }, 300);
        }}
      >
        <Tooltip placement="left" title={t('help')}>
          <InfoCircleTwoTone />
        </Tooltip>
      </div>
    );
  };

  return (
    <AntdCollapse activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
      {settings.map((group) => {
        const isHelpOpen = help === group.key && activeKey === group.key;

        return (
          <Panel
            header={genHeader(group.label[lang])}
            key={group.key}
            extra={genExtra(group.key)}
          >
            <PanelInner
              childs={group.childs}
              isHelpOpen={isHelpOpen}
              onCloseHelp={() => setHelp('none')}
            />
          </Panel>
        );
      })}
    </AntdCollapse>
  );
};

export default Collapse;
