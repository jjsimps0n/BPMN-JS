
// @ts-ignore
import { ModdleExtension } from 'bpmn-js/lib/dmn';

const custom: ModdleExtension = {
    "name": "Custom",
    "prefix": "custom",
    "uri": "http://custom",
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
            "name": "input",
            "isAttr": true,
            "type": "String"
          },
          {
            "name": "select",
            "isAttr": true,
            "type": "String"
          },
          {
            "name": "number",
            "isAttr": true,
            "type": "Number"
          },
          {
            "name": "checkbox",
            "isAttr": true,
            "type": "Number"
          },
          {
            "name": "textarea",
            "isAttr": true,
            "type": "Number"
          },
        ]
      }
    ]
};

export default custom;
