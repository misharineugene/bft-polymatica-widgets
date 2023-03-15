import { FC } from 'react';
//
import { Button } from 'antd';
//
import { useTranslation } from 'react-i18next';
//
import style from './style.module.scss';
import { storage } from '../../utils/ux';

type FooterProps = {
  onSave: () => void;
};

const Footer: FC<FooterProps> = ({ onSave }) => {
  const { t } = useTranslation();

  const onClick = () => {
    storage('isSave').set('true');

    onSave();
  };

  return (
    <div className={style.footer}>
      <Button type="primary" size="large" onClick={onClick}>
        {t('save.btn')}
      </Button>
    </div>
  );
};

export default Footer;
