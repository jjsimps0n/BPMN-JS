import { Component, OnInit } from '@angular/core';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import BpmnModeler from 'bpmn-js/lib/Modeler';
//@ts-ignore
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import camundaModdleExtension from './camunda-moddle-extension';



// CUSTOM PARAMETERS

// INPUT 
//@ts-ignore
import customPropertiesProvider from './providers/js-propertie-provider/custom-property-provider';
import custom from './providers/js-propertie-provider/descriptors/custom';


@Component({
  selector: 'app-root',
  template: `
    <div id="canvas"></div>
    <div id="properties"></div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const viewer = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        // BpmnPropertiesProviderModule,
        customPropertiesProvider,
      ],
      moddleExtensions: {
        camunda: camundaModdleExtension,
        custom: custom,
      }
    });
    // const customPropertiesProvider = new CustomPropertiesProvider(viewer);

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

            const propertiesPanel:any = viewer.get('propertiesPanel');
            // const customProvider = new CustomPropertiesProvider(viewer);
            // propertiesPanel.registerProvider(customProvider);
            propertiesPanel.attachTo('#properties');
          }
        });
      }
    };

    xhr.open('GET', xmlPath, true);
    xhr.setRequestHeader('Content-Type', 'application/xml');
    xhr.send();
  }
}
