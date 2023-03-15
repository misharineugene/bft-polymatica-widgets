import { useState, useEffect } from 'react';
//
import { notification, Spin } from 'antd';
//
import Footer from '../Footer';
//
import Header from '../Header';
import Collapse from '../Collapse';
// hooks
import { useTranslation } from 'react-i18next';
import { useAppState } from '../../hooks/useAppState';
// utils
import { storage } from '../../utils/ux';
import { Context } from '../../utils/getContext';
import { dispatch, editorHide, editorInit } from '../../utils/editorFuncs';
// types
import { langType, settingItemType } from '../../types';

notification.config({
  placement: 'topRight',
});

const App = () => {
  const [msg, contextHolder] = notification.useNotification();

  const { t, i18n } = useTranslation();
  const { lang: initLang } = useAppState();

  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<langType>(initLang);

  useEffect(() => {
    i18n.changeLanguage(initLang);
    editorInit();
    onSave();
  }, []);

  const onSave = () => {
    const isSave = storage('isSave').get();
    const settings: { [key: string]: settingItemType } =
      storage('settings').get();
    const setting = settings ? Object.entries(settings)[0] : null;

    if (setting) {
      setLoading(true);

      const [settingKey, settingValue] = setting;

      storage('settings').delByKey(settingKey);

      dispatch(settingValue);
    } else if (isSave) {
      msg.success({
        message: t('save.success'),
      });

      editorHide();

      storage('isSave').del();

      dispatch({
        target: 0,
        element: 'switch',
        value: false,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading} delay={500} tip={t('save.loading')}>
        <Header onChange={(value: langType) => setLang(value)} lang={lang} />

        <Context.Provider value={{ lang }}>
          <Collapse />
        </Context.Provider>

        <Footer onSave={onSave} />
      </Spin>
    </>
  );
};

export default App;
