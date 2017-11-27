/*
Created by Freshek on 28.10.2017
*/

class AutolockTab extends Tab {
  constructor(params = {}) {
    super(params);

    this._content.text('').append('<h4>Autolocker</h4>');

    const options = [{
      name: 'lockNpc',
      labelText: 'Autolock NPCs (key: x)',
      appendTo: this._content,
      event: function () {
        window.settings.lockNpc = this.checked;
      },
    }, {
      name: 'lockPlayers',
      labelText: 'Autolock Players (key: z)',
      appendTo: this._content,
      event: function () {
        window.settings.lockPlayers = this.checked;
      },
    }];

    options.forEach((option)=>{
      this[option.name] = ControlFactory.checkbox(option);
    });
  }
}
