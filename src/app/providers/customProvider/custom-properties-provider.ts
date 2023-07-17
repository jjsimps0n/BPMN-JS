// @ts-ignore
import { IPropertiesProvider, ITab, IGroup } from 'bpmn-js-properties-panel';

export class CustomPropertiesProvider implements IPropertiesProvider {
  constructor(private viewer: any) {}

  getTabs(element: any): ITab[] {
    return [
      // {
      //   id: 'customTab',
      //   label: 'Custom Tab'
      // }
    ];
  }

  getGroups(element: any): IGroup[] {
    return [
      // {
      //   id: 'customGroup',
      //   label: 'Custom Group',
      //   entries: [
      //     {
      //       id: 'propertyName',
      //       label: 'Property Name',
      //       type: 'text',
      //       value: element.propertyName || '',
      //       editable: true,
      //       set: (element: any, values: any, node: any) => {
      //         const propertyName = values.propertyName;
      //         // Perform any necessary logic with the updated value
      //         // ...
      //         // Call the modeling service to update the property
      //         const modeling = this.viewer.get('modeling');
      //         modeling.updateProperties(element, {
      //           propertyName: propertyName
      //         });
      //       }
      //     }
      //   ]
      // }
    ];
  }
}
