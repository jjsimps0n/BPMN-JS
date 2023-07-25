import {
  SelectEntry,
  CheckboxEntry,
  CollapsibleEntry,
  TextFieldEntry,
  ListEntry,
  ListItem
} from '@bpmn-io/properties-panel';
import { ChangeDetectorRef } from '@angular/core';
import {
  isSelectEntryEdited,
} from '@bpmn-io/properties-panel';
// import { SelectEntry } from 'bpmn-js-properties-panel/lib/factory';
import { useService } from 'bpmn-js-properties-panel';
import { taskState } from '../services/sharedStateService';
import { AppComponent } from './../../../app.component';

export default function (element, params = false) {

  return [
    {
      id: 'formProperties',
      element,
      params,
      component: SelectComponent,
      isEdited: isSelectEntryEdited
    },
    {
      id: 'formProperties1',
      element,
      params,
      component: CollapsibleEntryComponentTop,
    }
  ];
}

function SelectComponent(props) {
  const { element, id, params } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Action property');
  const appC = new AppComponent();


  const getValue = () => {
    return element.businessObject.select || '';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      select: value
    });
  }

  const getOptions = () => {
    return appC.getFormOptions(taskState[element.businessObject.sourceRef.id]) || '';
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




function SelectPropertieComponent(props) {
  const { element, id, params } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Propertie');
  const appC = new AppComponent();

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
      { value: 'option1', label: '>' },
      { value: 'option2', label: '<' },
      { value: 'option3', label: '=' },
      { value: 'option4', label: '!=' },
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

function SelectPropertieValueComponent(props) {
  const { element, id, params } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Symbol');
  const appC = new AppComponent();

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
      { value: 'option1', label: '>' },
      { value: 'option2', label: '<' },
      { value: 'option3', label: '=' },
      { value: 'option4', label: '!=' },
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

  const label = translate('Value');
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
let globalEntries = [];
function CollapsibleEntryComponentTop(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Properties nustatymai');
  let defaultArray = [];
  let currentArray = (globalEntries.length !== 0) ? globalEntries : defaultArray;

  function handleRemoveEntry(entryId, modelingParam, elementCustom) {
    let entries = (globalEntries.length !== 0) ? globalEntries : defaultArray;
    entries = entries.filter((entry) => entry.id !== entryId);
    globalEntries = entries;
    modeling.updateProperties(element, { entries:entries });
  };

  const handleAddEntry = () => {
    let entries = (globalEntries.length !== 0) ? globalEntries : defaultArray;
    entries.push({
      id: 'formProperties-instantiate-' + entries.length + 1,
      element,
      customRemove: handleRemoveEntry,
      component: CollapsibleEntryComponent,
    });
    globalEntries = entries;
    modeling.updateProperties(element, { entries:entries });
  };


  return new CollapsibleEntry({
    id,
    label,
    element,
    entries: currentArray,
    open: false,
    remove: handleAddEntry
  });
}


function CollapsibleEntryComponent(props) {
  const { element, id, customRemove, modelingParam, elementCustom } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Properties nustatymai');

  let entries = [
    {
      id: 'formProperties',
      element,
      component: SelectPropertieComponent,
    },
    {
      id: 'formProperties1',
      element,
      component: SelectPropertieValueComponent,
    },
    {
      id: 'formProperties2',
      element,
      component: InputComponent,
    },
  ];

  const handleRemoveEntry = () => {
    customRemove(id);
  };

  return new CollapsibleEntry({
    id,
    label,
    element,
    entries,
    remove: handleRemoveEntry, // Pass the remove function to the CollapsibleEntryComponent
  });
}