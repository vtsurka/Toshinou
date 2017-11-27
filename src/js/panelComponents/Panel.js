/*
Created by HaselLoyance on 26.11.2017
*/

const PANEL_HEADER_HEIGHT = 40;
const PANEL_ANIMATION_DURATION_MS = 400;
const PANEL_WIDTH = 350;

/* Provides an API for creating UI panels
 *   params, object, panel parameters
 *     name, string, name of the panel
 *     tabs, array of Tab, panel tabs, overrides name
 *     width, number, width of the panel
 *     height, number, height of the panel
 *     x, number, position from the left of the screen
 *     y, number, position from the top of the screen
 *     maxHeight, number, maximum height of the panel
 *     isMinimized, bool, specifies if panel is minimized or not
 */
class Panel {
  constructor(params = {}) {
    const titlebarColor = ColorConverter.hexToRgb(window.globalSettings.headerColor);
    const contentColor = ColorConverter.hexToRgb(window.globalSettings.panelColor);

    this._titlebar = jQuery('<div>', {
      'class': 'titlebar',
      css: {
        backgroundColor: ColorConverter.combine(titlebarColor.r, titlebarColor.g, titlebarColor.b, window.globalSettings.headerOpacity),
      },
    });

    this._panel = jQuery('<div>', {
      width: params.width || PANEL_WIDTH,
      height: (params.height + PANEL_HEADER_HEIGHT) || '',
      'class': 'panel',
      css: {
        left: params.x || 0,
        top: params.y || 0,
      },
    })
    .draggable({
      handle: this._titlebar,
      drag: (e, ui) => {
        ui.position.left = Math.max(-this.width / 2, ui.position.left);
        ui.position.left = Math.min(ui.position.left, $(window).width() - this.width / 2);
        ui.position.top = Math.max(-PANEL_HEADER_HEIGHT / 2, ui.position.top);
        ui.position.top = Math.min(ui.position.top, $(window).height() - PANEL_HEADER_HEIGHT / 2);

        this.x = ui.position.left;
        this.y = ui.position.top;
      },
    })
    //.resizable({}) TODO: Maybe leave this out
    .appendTo('body');

    this._titlebar.appendTo(this._panel);

    this._content = jQuery('<div>', {
      'class': 'content',
      css: {
        maxHeight: params.maxHeight || '',
        backgroundColor: ColorConverter.combine(contentColor.r, contentColor.g, contentColor.b, window.globalSettings.panelOpacity),
      },
    })
    .appendTo(this._panel);

    if (params.tabs) {
      this._titlebar.css({
        padding:2,
      });

      this._tabs = [];

      params.tabs.forEach((tab, i) => {
        this._tabs.push(tab);

        tab._tab.appendTo(this._titlebar)
        .click(() => {
          this.activeTab = i;
        });
      });
    } else {
      this._header = jQuery('<h4>', {
        text: this.name,
      }).appendTo(this._titlebar);
    }

    this._minimizeBtn = jQuery('<span>', {
      'class': 'minimize-btn',
      css: {
        backgroundImage: `url(${chrome.extension.getURL('icons/minimize.png')})`,
      },
    })
    .appendTo(this._titlebar)
    .click(() => {
      this.isMinimized = !this.isMinimized;
    });

    this.isMinimized = params.isMinimized || true;
    this.activeTab = 0;
  }

  get width () {
    return this._panel.width();
  }

  set width (value) {
    this._panel.width(value);
    return this;
  }

  get height () {
    return this._panel.height();
  }

  set height (value) {
    this._panel.height(value);
    return this;
  }

  get x () {
    return this._panel.offset.left;
  }

  set x (value) {
    this._panel.offset({
      left: value,
    });
    return this;
  }

  get y () {
    return this._panel.offset.top;
  }

  set y (value) {
    this._panel.offset({
      top: value,
    });
    return this;
  }

  get isMinimized () {
    return this._isMinimized;
  }

  set isMinimized (value) {
    if (value) {
      this._minimize();
    } else {
      this._maximize();
    }
    return this;
  }

  get name () {
    return this._name || 'Untitled';
  }

  set name (value) {
    this._name = value;
    if (this._header) {
      this._header.text(value);
    }
    return this;
  }

  get activeTab () {
    return this._activeTab || 0;
  }

  set activeTab (value) {
    if (this._tabs[value].isActive) {
      return this;
    }

    this._tabs[this.activeTab]._deselect();
    this._activeTab = value;
    this._tabs[value]._select();

    this._content.replaceWith(this._tabs[value]._content);
    this._content = this._tabs[value]._content;

    if (this.isMinimized) {
      this._content.css({
        opacity: 0,
        display:'none',
      });
    } else {
      this._content.css({
        opacity: 1,
        display:'block',
      });
    }
    //this._content.appendTo(this._panel);

    return this;
  }

  _minimize () {
    this._isMinimized = true;
    this._content.slideUp(PANEL_ANIMATION_DURATION_MS)
    .animate({
      opacity: 0,
    }, {
      queue: false,
      duration: PANEL_ANIMATION_DURATION_MS,
    });
  }

  _maximize () {
    this._isMinimized = false;
    this._content.slideDown(PANEL_ANIMATION_DURATION_MS)
    .animate({
      opacity: window.globalSettings.panelOpacity,
    }, {
      queue: false,
      duration: PANEL_ANIMATION_DURATION_MS,
    });
  }
}
