import {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
  MutableRefObject,
  ReactNode,
} from 'react';
//
import _ from 'lodash';
//
import { Carousel, Form, Image, Tour, TourStepProps } from 'antd';
import { EyeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
//
import FormItem from '../../FormItem';
// hooks
import { useTranslation } from 'react-i18next';
import { extraType as extraT, useExtra } from '../../../hooks/useExtra';
import { useFormula } from '../../../hooks/useFormula';
// utils
import { Context } from '../../../utils/getContext';
import {
  getExtraMap,
  getFormulaMap,
  keyHasTag,
} from '../../../utils/getPanelFunc';

// types
import { CustomArrowProps } from '@ant-design/react-slick';
import { onFormType, childType, urefType } from '../../../types';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

type refsType = MutableRefObject<null>[];

type PanelInner = {
  childs: childType[];
  isHelpOpen: boolean;
  onCloseHelp: () => void;
};

const PanelInner: FC<PanelInner> = ({ childs, isHelpOpen, onCloseHelp }) => {
  const { t } = useTranslation();
  const { lang } = useContext(Context);
  //
  const [extra, setExtra] = useExtra(childs);
  const [formula, setFormula] = useFormula(childs);
  //
  const [open, setOpen] = useState(isHelpOpen);
  const [steps, setSteps] = useState<TourStepProps[]>([]);
  const [refs, setRefs] = useState<refsType>([]);
  const ref = useRef(null);
  //
  const { extraMap, extraMapValues } = getExtraMap(childs);
  const formulaMap = getFormulaMap(childs);

  useEffect(() => {
    Object.keys(extraMap).forEach((key) => {
      const findItem = childs.find((item) => item.key === key);

      if (findItem) onForm(key, findItem.defaultValue);
    });

    const itemsRefs: refsType = [];

    for (let i = 0; i < childs.length; i++) {
      if (childs[i].element === 'list') {
        const kidsRef = childs[i].kids!.map(() => _.clone(ref));
        itemsRefs.push(...kidsRef);
      } else {
        itemsRefs.push(_.clone(ref));
      }
    }

    setRefs(itemsRefs);
  }, []);

  type CustomArrowType = CustomArrowProps & {
    children?: ReactNode;
  };

  const getCover = (cover: string[]): ReactNode => {
    const SlickButtonFix: FC<CustomArrowType> = ({
      currentSlide,
      slideCount,
      children,
      ...props
    }) => <div {...props}>{children}</div>;

    if (cover.length > 1) {
      return (
        <Carousel
          autoplay
          arrows
          draggable
          prevArrow={
            <SlickButtonFix>
              <LeftOutlined />
            </SlickButtonFix>
          }
          nextArrow={
            <SlickButtonFix>
              <RightOutlined />
            </SlickButtonFix>
          }
        >
          {cover.map((img) => {
            return (
              <Image
                key={img}
                src={`editor/help/images/${img}`}
                preview={{
                  mask: (
                    <>
                      <EyeOutlined />
                      <span style={{ marginLeft: 10 }}>Посмотреть</span>
                    </>
                  ),
                }}
              />
            );
          })}
        </Carousel>
      );
    }

    const img = cover[0];

    return (
      <Image
        key={img}
        src={`editor/help/images/${img}`}
        preview={{
          mask: (
            <>
              <EyeOutlined />
              <span style={{ marginLeft: 10 }}>{t('preview')}</span>
            </>
          ),
        }}
      />
    );
  };

  useEffect(() => {
    let refCount = 0;
    const currentSteps: TourStepProps[] = childs.reduce(
      (childAcc: TourStepProps[], child, index, arr) => {
        const isLast = index === arr.length - 1;
        let target;

        const addStep = (child: childType) => {
          const help = child.help || {
            ru: {
              title: '',
            },
            en: {
              title: '',
            },
          };

          target = refs[refCount] ? refs[refCount].current : null;
          childAcc.push({
            title: htmlToReactParser.parse(help[lang].title),
            description: htmlToReactParser.parse(help[lang].description!),
            ...(help.cover &&
              help.cover.length && {
                cover: getCover(help.cover),
              }),
            placement: 'left',
            target,
            prevButtonProps: {
              children: t('prev'),
            },
            nextButtonProps: {
              children: isLast ? t('finish') : t('next'),
            },
          });
          refCount++;
        };

        if (child.element === 'list') {
          child.kids!.forEach((kid) => addStep(kid));
        } else {
          addStep(child);
        }

        return childAcc;
      },
      [],
    );

    setSteps(currentSteps);
  }, [refs, lang]);

  useEffect(() => {
    for (let i = 0; i < refs.length; i++) {
      const currentRef: MutableRefObject<HTMLElement | null> = refs[i];

      if (currentRef.current) {
        currentRef.current.style.pointerEvents = isHelpOpen ? 'none' : 'auto';
      }
    }

    setOpen(isHelpOpen);
  }, [isHelpOpen]);

  const onForm: onFormType = (key, value) => {
    if (extraMap[key]) {
      setExtra((prevState) => ({
        ...prevState,
        ...extraMap[key].reduce((acc: extraT, item, index) => {
          acc[item] = extraMapValues[key][index].includes(value);

          return acc;
        }, {}),
      }));
    }

    const keyTag = keyHasTag(key, formulaMap);

    if (keyTag) {
      setFormula((prevState) => {
        if (value === 'keyDeleted') {
          delete prevState[keyTag][key];

          return prevState;
        }

        return {
          ...prevState,
          [keyTag]: {
            ...prevState[keyTag],
            [key]: value.toString(),
          },
        };
      });
    }
  };

  const onClose = () => {
    setOpen(false);
    onCloseHelp();
  };

  let refCount = 0;

  return (
    <>
      <Form>
        {childs.map((item) => {
          const { key, col, ...props } = item;
          let uref: urefType = refs[refCount];

          if (item.element === 'list') {
            uref = item.kids!.map(() => refs[refCount++]);
          } else {
            refCount++;
          }

          return (
            <FormItem
              uref={uref}
              key={key}
              ukey={key}
              onForm={onForm}
              disabled={extra[key]}
              formula={formula}
              col={col}
              {...props}
            />
          );
        })}
      </Form>
      <Tour open={open} onClose={onClose} steps={steps} />
    </>
  );
};

export default PanelInner;
