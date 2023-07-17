
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
            "type": "Bool"
          },
          {
            "name": "textarea",
            "isAttr": true,
            "type": "String"
          },
          {
            "name": "list",
            "isAttr": true,
            "type": "String"
          },
          {
            "name": "toggle",
            "isAttr": true,
            "type": "Bool"
          },
          {
            "name": "feel",
            "isAttr": true,
            "type": "String"
          },
        ]
      }
    ]
};

export default custom;
