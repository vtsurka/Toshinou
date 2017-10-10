/*
Created by Freshek on 07.10.2017
*/
class WindowFactory {

  static createWindow(params) {
    var div = jQuery("<div/>", {
      width: params.width != null ? params.width : 400,
      height: params.height != null ? params.height + 40: 300,
    });
    var header = jQuery("<h4/>", {
      width: "100%",
      height: "40px",
      text: params.text != "" ? params.text : "window"
    });

    div.css({backgroundColor: "rgba(25, 25, 25, 0.8)", position: "absolute"});
    div.appendTo("body");

    header.css({backgroundColor: "rgba(25, 25, 25, 0.9)", top: 0, left: 0, padding: "5px", boxSizing: "border-box"});
    header.appendTo(div);

    div.draggable({handle: header});

    return div;
  }
}
