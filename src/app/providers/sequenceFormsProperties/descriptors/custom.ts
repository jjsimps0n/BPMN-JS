
// @ts-ignore
import { ModdleExtension } from 'bpmn-js/lib/dmn';

const custom: ModdleExtension = {
    "name": "customSequenceFormsProperties",
    "prefix": "customSequenceFormsProperties",
    "uri": "http://customSequenceFormsProperties",
    "xml": {
      "tagAlias": "lowerCase"
    },
    "associations": [],
    "types": [
      {
        "name": "CustomStartEvent",
        "extends": [
          "bpmn:SequenceFlow",
          "bpmn:Task"
        ],
        "properties": [
          {
            "name": "select",
            "isAttr": true,
            "type": "String"
          },
          {
            "name": "formProperties",
            "isAttr": true,
            "type": "String"
          },
        ]
      }
    ]
};

export default custom;
