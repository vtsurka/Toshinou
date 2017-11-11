/*
Created by Freshek on 14.10.2017
*/

class CollectingWindow {
  createWindow() {
    this.botSettingsWindow = WindowFactory.createWindow({width: 300, height: 100, text: "Collecting"});

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


    this.collectionSensitivityInput = jQuery("<input>");
    this.collectionSensitivityInput.attr("type", "range");
    this.collectionSensitivityInput.attr("min", "1");
    this.collectionSensitivityInput.attr("max", "100");
    this.collectionSensitivityInput.attr("step", "1");
    this.collectionSensitivityInput.attr("value", "30");

    this.collectionSensitivityLabel = jQuery("<label>");
    this.collectionSensitivityLabel.text("Collection sensitivity");

    let collectionSensitivityVal = jQuery("<span>");
    collectionSensitivityVal.text("(30%)");


    this.collectBoxesBox.change(function() {
      window.settings.collectBoxes = this.checked;
    });

    this.collectMaterialsBox.change(function() {
      window.settings.collectMaterials = this.checked;
    });

    this.moveRandomlyBox.change(function() {
      window.settings.moveRandomly = this.checked;
    })

    this.collectionSensitivityInput.change(function() {
      window.settings.collectionSensitivity = this.value;
      collectionSensitivityVal.html('('+this.value+'%)');
    });

    this.collectBoxesBox.appendTo(this.botSettingsWindow);
    this.collectBoxesLabel.appendTo(this.botSettingsWindow);
    jQuery("<br>").appendTo(this.botSettingsWindow);
    this.collectMaterialsBox.appendTo(this.botSettingsWindow);
    this.collectMaterialsLabel.appendTo(this.botSettingsWindow);
    jQuery("<br>").appendTo(this.botSettingsWindow);
    this.moveRandomlyBox.appendTo(this.botSettingsWindow);
    this.moveRandomlyLabel.appendTo(this.botSettingsWindow);
    jQuery("<hr>").appendTo(this.botSettingsWindow);
    this.collectionSensitivityLabel.appendTo(this.botSettingsWindow);
    jQuery("<br>").appendTo(this.botSettingsWindow);
    collectionSensitivityVal.appendTo(this.collectionSensitivityLabel);
    jQuery("<br>").appendTo(this.botSettingsWindow);
    this.collectionSensitivityInput.appendTo(this.botSettingsWindow);

  }
}
