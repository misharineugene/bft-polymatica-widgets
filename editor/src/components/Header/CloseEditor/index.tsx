import { Button, Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
//
import SplitBr from '../../SplitBr';
// hooks
import { useTranslation } from 'react-i18next';
// utils
import { dispatch, editorHide } from '../../../utils/editorFuncs';

const CloseEditor = () => {
  const { t } = useTranslation();

  const onConfirm = () => {
    editorHide();

    dispatch({
      target: 0,
      element: 'switch',
      value: false,
    });
  };

  return (
    <Popconfirm
      placement="bottomRight"
      title={<SplitBr>{t('editor.closeText')}</SplitBr>}
      okText={t('yes')}
      cancelText={t('cancel')}
      onConfirm={onConfirm}
    >
      <Button type="dashed" icon={<CloseCircleOutlined />} size="small">
        {t('close')}
      </Button>
    </Popconfirm>
  );
};

export default CloseEditor;
