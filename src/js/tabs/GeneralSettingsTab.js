/*
Created by HaselLoyance on 26.11.2017
*/

class GeneralSettingsTab extends Tab {
  constructor(params ={}) {
    super(params);

    this._content.text('').append('<h4>General</h4>');

    const controls = [{
      name: 'collectBoxes',
      labelText: 'Collect boxes',
      appendTo: this._content,
      event: function () {
        window.settings.collectBoxes = this.checked;
      },
    }, {
      name: 'collectMaterials',
      labelText: 'Collect materials',
      appendTo: this._content,
      event: function () {
        window.settings.collectMaterials = this.checked;
      },
    }, {
        name: 'moveRandomly',
        labelText: 'Move randomly',
        appendTo: this._content,
        event: function () {
          window.settings.moveRandomly = this.checked;
        },
    }, {
      name: 'npcKiller',
      labelText: 'Kill NPCs',
      appendTo: this._content,
      event: function () {
        window.settings.killNpcs = this.checked;
      },
    }, {
      name: 'npcCircle',
      labelText: 'Circle (Beta)',
      appendTo: this._content,
      event: function () {
        window.settings.circleNpc = this.checked;
      },
    }, {
      name: 'collectionSensitivity',
      labelText: 'Collection sensitivity <span> (100%)</span>',
      type: 'range',
      appendTo: this._content,
      labelBefore: true,
      attrs: {
        min: 1,
        max: 100,
        step: 1,
        value: 100,
      },
      event: function (ev) {
        window.settings.collectionSensitivity = this.value;
        $('span:last-child', this.label).text(' (' + this.value + '%)');
      },
    }, {
      name: 'npcCircleRadius',
      labelText: ' Circle radius <span> (500px)</span>',
      type: 'range',
      appendTo: this._content,
      labelBefore: true,
      attrs: {
        min: 1,
        max: 800,
        step: 1,
        value: 500,
      },
      event: function (ev) {
        window.settings.npcCircleRadius = this.value;
        $('span:last-child', this.label).text(' (' + this.value + 'px)');
      },
    }];

    controls.forEach((control)=>{
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}
