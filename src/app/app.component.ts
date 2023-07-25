import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import BpmnModeler from 'bpmn-js/lib/Modeler';
//@ts-ignore
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import camundaModdleExtension from './camunda-moddle-extension';
import bpmnPaletteModule from 'bpmn-js/lib/features/palette';

// CUSTOM PARAMETERS

// INPUT
//@ts-ignore
import customPropertiesProvider from './providers/js-propertie-provider/custom-property-provider';
import custom from './providers/js-propertie-provider/descriptors/custom';

//@ts-ignore
import formsPropertiesProvider from './providers/sequenceFormsProperties/custom-property-provider';
import formsProviderCustoms from './providers/sequenceFormsProperties/descriptors/custom';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bpmn-js/dist/assets/bpmn-js.css',
    '../../node_modules/bpmn-js/dist/assets/diagram-js.css',
    '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css',
    '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css',
    '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css',
    '../../node_modules/bpmn-js-properties-panel/dist/assets/element-templates.css',
    '../../node_modules/bpmn-js-properties-panel/dist/assets/properties-panel.css',
  ],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    formsPropertiesProvider.param = [
      'value',
      [
        [
          { value: 'option1', label: 'Pasirinkimas 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]
      ]
    ];

    const viewer = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties',
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        // BpmnPropertiesProviderModule,
        // customPropertiesProvider,
        formsPropertiesProvider,
        bpmnPaletteModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleExtension,
        // custom: custom,
        formsProviderCustoms: formsProviderCustoms
      },
    });


    const xmlPath = 'assets/init.bpmn'; // Adjust the path to your XML file

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const bpmnXml = xhr.response;
        viewer.importXML(bpmnXml, (err: any) => {
          if (err) {
            console.error('Failed to import BPMN diagram', err);
          } else {
            console.log('BPMN diagram imported successfully.');

            const propertiesPanel: any = viewer.get('propertiesPanel');
            propertiesPanel.attachTo('#properties');
          }
        });
      }
    };

    xhr.open('GET', xmlPath, true);
    xhr.setRequestHeader('Content-Type', 'application/xml');
    xhr.send();
  }

  onImport() {
    console.log("BPMPN imported succsefully")
  };

  onSave() {
    console.log("BPMPN saved to your PC")
  };

  onClear() {
    console.log("BPMPN diagram cleared!")
  };

  formCode: string = '';
  public setFormOptions(value: string) {
    this.formCode = value;
  }

  public getFormOptions(value: string) {
    if (value == 'option1') {
      return [
        { value: 'option1', label: 'Pasirinkimas 1' },
        { value: 'option2', label: 'sendEmail()' },
      ]
    }
    if (value == 'option2') {
      return [
        { value: 'option2', label: 'Pasirinkimas 2' },
      ]
    }
    return [];
  }
}
