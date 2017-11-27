/*
Created by Freshek on 31.10.2017
*/

class GlobalSettings {
  constructor() {
    var self = this;
    chrome.storage.local.get({
      headerColor: "#191919",
      headerOpacity: "0.9",
      panelColor: "#191919",
      panelOpacity: "0.8",
      timerTick: 300
    }, items => {
      self._settings = items;
    });
  }

  get headerColor() {
    return this._settings.headerColor;
  }

  get headerOpacity() {
    return this._settings.headerOpacity;
  }

  get panelColor() {
    return this._settings.panelColor;
  }

  get panelOpacity() {
    return this._settings.panelOpacity;
  }

  get timerTick() {
    return this._settings.timerTick;
  }
}
