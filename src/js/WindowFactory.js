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
      text: params.text != "" ? params.text : "window"
    });

    var minimizeBtn = jQuery("<h4/>", {
      height: "40px",
      text: "–"
    })

    div.css({backgroundColor: "transparent", position: "absolute"});
    div.appendTo("body");

    header.css({backgroundColor: "rgba(25, 25, 25, 0.9)", top: 0, left: 0, padding: "5px", boxSizing: "border-box"});
    header.appendTo(div);

    minimizeBtn.css({top: 0, right: 0, padding: "10px", position: "absolute"});
    minimizeBtn.appendTo(div);

    content.css({backgroundColor: "rgba(25, 25, 25, 0.8)"});
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
