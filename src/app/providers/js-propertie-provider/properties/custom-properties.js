import { 
    TextFieldEntry,
    SelectEntry,
    NumberFieldEntry,
    CheckboxEntry,
    TextAreaEntry
} from '@bpmn-io/properties-panel';

import { 
    isTextFieldEntryEdited,
    isSelectEntryEdited,
    isNumberFieldEntryEdited,
    isCheckboxEntryEdited,
    isTextAreaEntryEdited
} from '@bpmn-io/properties-panel';
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
      isEdited: isSelectEntryEdited
    },
    {
      id: 'number',
      element,
      component: NumberComponent,
      isEdited: isNumberFieldEntryEdited
    },
    {
      id: 'checkBox',
      element,
      component: CheckBoxComponent,
      isEdited: isCheckboxEntryEdited
    },
    {
      id: 'textarea',
      element,
      component: TextAreaComponent,
      isEdited: isTextAreaEntryEdited
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

function NumberComponent(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
    const label = translate('Number parametras [LT]');
  
    const getValue = () => {
      return element.businessObject.number || '';
    }
  
    const setValue = value => {
      return modeling.updateProperties(element, {
        number: value
      });
    }
  
    return new NumberFieldEntry({
      id,
      label,
      element,
      getValue,
      setValue,
      debounce,
    });
}

function CheckBoxComponent(props) {
const { element, id } = props;

const modeling = useService('modeling');
const translate = useService('translate');
const debounce = useService('debounceInput');
const label = translate('CheckBox parametras [LT]');

const getValue = () => {
    return element.businessObject.checkbox || '';
}

const setValue = value => {
    return modeling.updateProperties(element, {
        checkbox: value
    });
}

return new CheckboxEntry({
    id,
    label,
    element,
    getValue,
    setValue,
    debounce,
});
}

function TextAreaComponent(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
    const label = translate('TextArea parametras [LT]');
  
    const getValue = () => {
      return element.businessObject.textarea || '';
    }
  
    const setValue = value => {
      return modeling.updateProperties(element, {
        textarea: value
      });
    }
  
    return new TextAreaEntry({
      id,
      label,
      element,
      getValue,
      setValue,
      debounce,
    });
}