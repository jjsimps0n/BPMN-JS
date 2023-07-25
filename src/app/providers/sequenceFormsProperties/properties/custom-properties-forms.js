import { 
    SelectEntry,
} from '@bpmn-io/properties-panel';

import { 
    isSelectEntryEdited,
} from '@bpmn-io/properties-panel';
// import { SelectEntry } from 'bpmn-js-properties-panel/lib/factory';
import { useService } from 'bpmn-js-properties-panel';

import { setTaskState } from '../services/sharedStateService';

export default function(element, params = false) {

  return [
    {
      id: 'select',
      element,
      params,
      component: SelectComponent,
      isEdited: isSelectEntryEdited
    }
  ];
}

function SelectComponent(props) {
  const { element, id, params } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const label = translate('Pasirinkite forma');
  const getValue = () => {
    return element.businessObject.select || '';
  }

  const setValue = value => {
    setTaskState(element.businessObject.id, value);
    return modeling.updateProperties(element, {
      select: value
    });
  }

  const getOptions = () => {
    return params[0] || '';
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

