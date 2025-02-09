/*
Created by Freshek on 31.10.2017
*/

function saveOptions(e) {
  e.preventDefault();
  var elements = {
    headerColor: $("#headerColor").val(),
    headerOpacity: $("#headerOpacity").val(),
    windowColor: $("#windowColor").val(),
    windowOpacity: $("#windowOpacity").val(),
    timerTick: $("#timerTick").val(),
    showRuntime: $("#showRuntime").prop('checked'),
  };

  chrome.storage.local.set(elements);
}

function restore() {
  var items = ["headerColor", "headerOpacity", "windowColor", "windowOpacity", "timerTick", "showRuntime"];

  var onGet = items => {

    console.log(items);

    if (items.headerColor)
      $("#headerColor").val(items.headerColor);
    if (items.headerOpacity)
      $("#headerOpacity").val(items.headerOpacity);
    if (items.windowColor)
      $("#windowColor").val(items.windowColor);
    if (items.windowOpacity)
      $("#windowOpacity").val(items.windowOpacity);
    if (items.timerTick)
      $("#timerTick").val(items.timerTick);
    if (items.showRuntime)
      $("#showRuntime").prop('checked', true);
  };

  chrome.storage.local.get(items, onGet);
}

$("form").on("submit", saveOptions);
$(document).ready(restore);
