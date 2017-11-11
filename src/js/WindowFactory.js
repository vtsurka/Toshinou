/*
Created by Freshek on 07.10.2017
*/
class WindowFactory {

  static createWindow(params) {
    var div = jQuery("<div/>", {
      width: params.width != null ? params.width : 400,
      height: params.height != null ? params.height + 40: 300,
    });

    var content = jQuery("<div/>", {
      width: params.width,
      height: params.height
    });

    var header = jQuery("<h4/>", {
      width: "100%",
      height: "40px",
      text: params.text != null ? params.text : "window"
    });

    var minimizeBtn = jQuery("<h4/>", {
      height: "40px",
      text: "–"
    })

    div.css({backgroundColor: "transparent", position: "absolute"});
    div.appendTo("body");

    var headerCol = ColorConverter.hexToRgb(window.globalSettings.headerColor);
    header.css({backgroundColor: ColorConverter.combine(headerCol.r, headerCol.g, headerCol.b, window.globalSettings.headerOpacity), top: 0, left: 0, padding: "5px", boxSizing: "border-box", border: "#287490 solid 1px"});
    header.appendTo(div);

    minimizeBtn.css({top: 0, right: 0, padding: "10px", position: "absolute"});
    minimizeBtn.appendTo(div);

    var bgCol = ColorConverter.hexToRgb(window.globalSettings.windowColor);
    content.css({backgroundColor: ColorConverter.combine(bgCol.r, bgCol.g, bgCol.b, window.globalSettings.windowOpacity), boxSizing: "border-box", border: "#287490 solid 1px", borderTop: "none", overflowY: "auto"});
    content.appendTo(div);

    minimizeBtn.click(function() {
      if (content.css("display") !== "none") {
        content.fadeOut(500);
      }
      else {
        content.fadeIn(500);
      }
    });

    div.draggable({handle: header});

    return content;
  }
}
