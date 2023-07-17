
// @ts-ignore
import { ModdleExtension } from 'bpmn-js/lib/dmn';

const camundaModdleExtension: ModdleExtension = {
  name: 'camunda',
  uri: 'http://camunda.org/schema/1.0/bpmn',
  prefix: 'camunda',
  xml: {
    tagAlias: 'lowerCase'
  },
  types: []
};

export default camundaModdleExtension;
