/*
Created by Freshek on 28.10.2017
*/

class AutolockWindow {
  createWindow() {
    this.autolockWindow = WindowFactory.createWindow({width: 300, height: 100, text: "Autolocker (experimental)"});

    this.lockNpcBox = jQuery("<input>").attr("type", "checkbox");
    this.lockNpcLabel = jQuery("<label>").text("Autolock NPCs (key: x)");

    var br = jQuery("<br>");

    this.lockPlayersBox = jQuery("<input>").attr("type", "checkbox");
    this.lockPlayersLabel = jQuery("<label>").text("Autolock Players (key: z)");

    this.lockNpcBox.change(function() {
      window.settings.lockNpc = this.checked;
    });

    this.lockPlayersBox.change(function() {
      window.settings.lockPlayers = this.checked;
    });

    this.lockNpcBox.appendTo(this.autolockWindow);
    this.lockNpcLabel.appendTo(this.autolockWindow);
    br.appendTo(this.autolockWindow);
    this.lockPlayersBox.appendTo(this.autolockWindow);
    this.lockPlayersLabel.appendTo(this.autolockWindow);
  }
}
