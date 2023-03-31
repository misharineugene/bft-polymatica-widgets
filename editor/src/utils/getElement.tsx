import FormList from '../components/FormList';
import List from '../components/List';
import Input from '../components/UI/Input';
import Formula from '../components/UI/Formula';
import Number from '../components/UI/Number';
import RadioButton from '../components/UI/RadioButton';
import Select from '../components/UI/Select';
import Switch from '../components/UI/Switch';
import Color from '../components/UI/Color';
import Text from '../components/UI/Text';
import Slider from '../components/UI/Slider';
import Combo from '../components/UI/Combo';

const elements = {
  text: (props) => <Text {...props} />,
  textInline: (props) => <Text {...{ ...props, inline: true }} />,
  textTpls: (props) => <Text {...{ ...props, tpls: true }} />,
  input: (props) => <Input {...props} />,
  number: (props) => <Number {...props} />,
  switch: (props) => <Switch {...props} />,
  select: (props) => <Select {...props} />,
  color: (props) => <Color {...props} />,
  list: (props) => <List {...props} />,
  formList: (props) => <FormList {...props} />,
  formula: (props) => <Formula {...props} />,
  radioButton: (props) => <RadioButton {...props} />,
  slider: (props) => <Slider {...props} />,
  combo: (props) => <Combo {...props} />,
} as {
  [key: string]: (props: any) => any;
};

export const getElement = (element: string) => {
  return elements[element];
};
