import { FC } from 'react';
//
import { Divider, Radio, RadioChangeEvent } from 'antd';
//
import CloseEditor from './CloseEditor';
//
import { useTranslation } from 'react-i18next';
// types
import { langType } from '../../types';
//
import style from './style.module.scss';

type HeaderProps = {
  onChange: (value: langType) => void;
  lang: langType;
};

const Header: FC<HeaderProps> = ({ onChange, lang }) => {
  const { t, i18n } = useTranslation();

  const onChangeLang = ({ target: { value } }: RadioChangeEvent) => {
    i18n.changeLanguage(value);
    onChange(value);
  };

  return (
    <div className={style.header}>
      <Radio.Group
        optionType="button"
        style={{ display: 'flex' }}
        defaultValue={lang}
        size="small"
        onChange={onChangeLang}
        options={[
          { value: 'ru', label: t('russian') },
          { value: 'en', label: t('english') },
        ]}
      />

      <div className={style.divider}>
        <Divider>{t('editor.title')}</Divider>
      </div>

      <CloseEditor />
    </div>
  );
};

export default Header;
