/*
Created by Freshek on 14.10.2017
*/

class SettingsWindow {
  createWindow() {
    window.botSettingsWindow = WindowFactory.createWindow({width: 300, height: 100, text: "Settings"});

    this.collectBoxesBox = jQuery("<input>")
    this.collectBoxesBox.attr("type", "checkbox");

    this.collectBoxesLabel = jQuery("<label>");
    this.collectBoxesLabel.text("Collect boxes");

    var br = jQuery("<br>");

    this.collectMaterialsBox = jQuery("<input>");
    this.collectMaterialsBox.attr("type", "checkbox");

    this.collectMaterialsLabel = jQuery("<label>");
    this.collectMaterialsLabel.text("Collect materials");

    this.moveRandomlyBox = jQuery("<input>");
    this.moveRandomlyBox.attr("type", "checkbox");

    this.moveRandomlyLabel = jQuery("<label>");
    this.moveRandomlyLabel.text("Move randomly");

    this.collectBoxesBox.change(function() {
      window.settings.collectBoxes = this.checked;
    });

    this.collectMaterialsBox.change(function() {
      window.settings.collectMaterials = this.checked;
    });

    this.moveRandomlyBox.change(function() {
      window.settings.moveRandomly = this.checked;
    })

    this.collectBoxesBox.appendTo(window.botSettingsWindow);
    this.collectBoxesLabel.appendTo(window.botSettingsWindow);
    br.appendTo(window.botSettingsWindow);
    this.collectMaterialsBox.appendTo(window.botSettingsWindow);
    this.collectMaterialsLabel.appendTo(window.botSettingsWindow);
    br.appendTo(window.botSettingsWindow);
    this.moveRandomlyBox.appendTo(window.botSettingsWindow);
    this.moveRandomlyLabel.appendTo(window.botSettingsWindow);
  }
}
