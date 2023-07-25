import { 
    TextFieldEntry,
    SelectEntry,
    NumberFieldEntry,
    CheckboxEntry,
    TextAreaEntry,
    ListEntry,
    ToggleSwitchEntry,
    FeelEntry
} from '@bpmn-io/properties-panel';

import { 
    isTextFieldEntryEdited,
    isSelectEntryEdited,
    isNumberFieldEntryEdited,
    isCheckboxEntryEdited,
    isTextAreaEntryEdited,
    isToggleSwitchEntryEdited,
    isFeelEntryEdited
} from '@bpmn-io/properties-panel';
// import { SelectEntry } from 'bpmn-js-properties-panel/lib/factory';
import { useService } from 'bpmn-js-properties-panel';

export default function(element, params = false) {

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
      params,
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
    {
      id: 'list',
      element,
      component: ListEntryComponent,
      isEdited: isTextAreaEntryEdited
    },
    {
      id: 'toggle',
      element,
      component: ToggleSwitchEntryComponent,
      isEdited: isToggleSwitchEntryEdited
    },
    {
      id: 'feel',
      element,
      component: FeelEntryComponent,
      isEdited: isFeelEntryEdited
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
  const { element, id, params } = props;
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
    return params;
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

function ListEntryComponent(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
    const label = translate('List parametras [LT]');
  
    const getValue = () => {
      return element.businessObject.list || '';
    }
  
    const setValue = value => {
      return modeling.updateProperties(element, {
        list: value
      });
    }
  
    const onAdd = (newOption) => {
      // Perform any necessary logic when an option is added
      console.log('Option added:', newOption);
      
      // For example, you can update the model or perform some action
      // based on the new option value
      if (newOption) {
        // Add the logic to update the model or perform an action here
        // ...
      }
    };
  
    return new ListEntry({
      id,
      label,
      element,
      getValue,
      setValue,
      debounce,
      onAdd
    });
}

function ToggleSwitchEntryComponent(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
    const label = translate('Toggle Switch parametras [LT]');
  
    const getValue = () => {
      return element.businessObject.toggle || false;
    };
  
    const setValue = value => {
      return modeling.updateProperties(element, {
        toggle: value
      });
    };
  
    const onToggle = (newValue) => {
      // Perform any necessary logic when the toggle switch is toggled
      console.log('Toggle Switch toggled:', newValue);
  
      // For example, you can update the model or perform some action
      // based on the new toggle switch value
      if (newValue) {
        // Add the logic to update the model or perform an action here
        // ...
      }
    };
  
    return new ToggleSwitchEntry({
      id,
      label,
      element,
      getValue,
      setValue,
      debounce,
      onToggle
    });
}

function FeelEntryComponent(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
    const label = translate('FEEL parametras [LT]');
  
    const getValue = () => {
      return element.businessObject.feel || '';
    };
  
    const setValue = value => {
      return modeling.updateProperties(element, {
        feel: value
      });
    };
  
    const onInput = (newValue) => {
      // Perform any necessary logic when the input value changes
      console.log('FEEL Entry value changed:', newValue);
  
      // For example, you can update the model or perform some action
      // based on the new input value
      // ...
    };
  
    return new FeelEntry({
      id,
      label,
      element,
      getValue,
      setValue,
      debounce,
      onInput
    });
}