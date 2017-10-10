/*
Created by Freshek on 09.10.2017
*/

class ResourcesManager {
  static get(name) {
    var url = browser.extension.getURL("res/injectables/HeroPositionUpdater.js");

    var xhr = new XMLHttpRequest(); //using XMLHR because I don't like the jquery implementation of Ajax
    xhr.open("GET", url, false);
    xhr.send(null);

    return xhr.responseText;
  }

  static getUrl(name) {
    return browser.extension.getURL(name);
  }
}
