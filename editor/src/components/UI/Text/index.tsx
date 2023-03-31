import { FC, useRef, useContext, MutableRefObject } from 'react';
//
import { Editor } from '@tinymce/tinymce-react';
// types
import { Editor as TinyMCEEditor } from 'tinymce';
import { Context } from '../../../utils/getContext';
import { textDispatch } from '../../../utils/textElementFuncs';
//
import style from './style.module.scss';
import cn from 'classnames';

type TextProps = {
  disabled: boolean;
  defaultValue: string;
  uref: MutableRefObject<HTMLDivElement>;
  target: number;
  ukey: string;
  inline?: boolean;
  tpls?: boolean;
};

const Text: FC<TextProps> = ({
  disabled,
  defaultValue,
  target,
  ukey,
  uref,
  inline,
  tpls,
}) => {
  const { lang } = useContext(Context);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const onChange = (content: string) => {
    textDispatch(content, ukey, target);
  };

  const widgetUrl = document.location.pathname.replace('/index.html', '');
  const plugins = [];

  if (inline || tpls) plugins.push('tpls', 'link');

  return (
    <div
      ref={uref}
      className={cn({
        [style.textInline]: inline,
      })}
    >
      <Editor
        tinymceScriptSrc={widgetUrl + '/editor/tinymce/tinymce.min.js'}
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={defaultValue}
        init={{
          inline: inline || false,
          height: 150,
          menubar: false,
          plugins,
          toolbar: `fontsize | bold italic | alignleft aligncenter alignright | forecolor backcolor lineheight ${
            inline || tpls ? '| link | tpls' : ''
          }`,
          font_size_formats: '8px 10px 12px 14px 18px 24px 36px',
          content_style: 'body { font-family: Arial; font-size: 12px;  }',
          language: lang,
        }}
        onEditorChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Text;
