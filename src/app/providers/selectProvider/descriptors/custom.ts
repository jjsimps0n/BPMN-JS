
// @ts-ignore
import { ModdleExtension } from 'bpmn-js/lib/dmn';

const Select: ModdleExtension = {
    "name": "Select",
    "prefix": "select",
    "uri": "http://select",
    "xml": {
      "tagAlias": "lowerCase"
    },
    "associations": [],
    "types": [
      {
        "name": "CustomStartEvent",
        "extends": [
          "bpmn:Task"
        ],
        "properties": [
          {
            "name": "custom",
            "isAttr": true,
            "type": "String"
          }
        ]
      }
    ]
};

export default Select;
