/*
Created by Freshek on 14.10.2017
*/

class CollectingWindow {
  createWindow() {
    this.botSettingsWindow = WindowFactory.createWindow({width: 300, text: "Collecting"});

    let controls = [
      {
        name: 'collectBoxes',
        labelText: 'Collect boxes',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.collectBoxes = this.checked;
        }
      },
      {
        name: 'collectMaterials',
        labelText: 'Collect materials',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.collectMaterials = this.checked;
        }
      },
      {
        name: 'moveRandomly',
        labelText: 'Move randomly',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.moveRandomly = this.checked;
        }
      },
      {
        name: 'collectionSensitivity',
        labelText: 'Collection sensitivity <span> (100%)</span>',
        type: 'range',
        appendTo: this.botSettingsWindow,
        labelBefore: true,
        attrs: {
          min: 1,
          max: 100,
          step: 1,
          value: 100,
        }
        ,
        event: function (ev) {
          window.settings.collectionSensitivity = this.value;
          $('span:last-child', this.label).text(' (' + this.value + '%)');
        }
      },
    ];

    controls.forEach((control)=>{
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}
