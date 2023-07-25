// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import customPropertiesSequance from './properties/custom-properties-sequance';
import customPropertiesForms from './properties/custom-properties-forms';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
function CustomPropertiesProvider(propertiesPanel, translate, param = false) {

  // API ////////
  const paramValue = param; // Access the parameter value here

  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function(element) {

    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return function(groups) {

      // Add the "magic" group
      if(is(element, 'bpmn:SequenceFlow')) {
        groups.push(createCustomGroup(element, translate, paramValue));
      }
      if(is(element, 'bpmn:Task')) {
        groups.push(createCustomFormsGroup(element, translate, paramValue));
      }

      return groups;
    }
  };

  


  // registration ////////

  // Register our custom magic properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel', 'translate', 'param' ];

// Create the custom magic group
function createCustomGroup(element, translate, params = false) {
    // console.log(customData);
  // create a group called "Custom properties".
  const customGroup = {
    id: 'custom',
    label: translate('Užduoties parametrai'),
    entries: customPropertiesSequance(element, params)
  };

  return customGroup;
}

function createCustomFormsGroup(element, translate, params = false) {
    // console.log(customData);
  // create a group called "Custom properties".
  const customGroup = {
    id: 'custom',
    label: translate('Užduoties parametrai'),
    entries: customPropertiesForms(element, params)
  };

  return customGroup;
}


export default {
  __init__: [ 'customPropertiesProvider', 'param' ],
  customPropertiesProvider: [ 'type', CustomPropertiesProvider ],
  param: ['value', false],
};