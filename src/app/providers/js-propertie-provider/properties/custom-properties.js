import { TextFieldEntry, isTextFieldEntryEdited, SelectEntry } from '@bpmn-io/properties-panel';
// import { SelectEntry } from 'bpmn-js-properties-panel/lib/factory';
import { useService } from 'bpmn-js-properties-panel';

export default function(element) {

  return [
    {
      id: 'input',
      element,
      component: InputComponent,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'select',
      element,
      component: SelectComponent,
      isEdited: isTextFieldEntryEdited
    },
  ];
}

function InputComponent(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.input || '';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
        input: value
    });
  }

  const label = translate('Input parametras [LT]');
//   const description = translate('Papildomo parametro aprasymas [LT]')
  return new TextFieldEntry({
    id,
    element,
    getValue,
    setValue,
    debounce,
    label,
    // description
  });
}

function SelectComponent(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const label = translate('Select parametras [LT]');

  const getValue = () => {
    return element.businessObject.select || '';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      select: value
    });
  }

  const getOptions = () => {
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
  };

  return new SelectEntry({
    id,
    label,
    element,
    getValue,
    setValue,
    getOptions
  });
}