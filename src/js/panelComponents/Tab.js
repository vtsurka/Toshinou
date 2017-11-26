/*
Created by HaselLoyance on 26.11.2017
*/

const TAB_ANIMATION_DURATION_MS = 200;

/* Provides an API for creating tabs for UI panels
 *   params, object, tab parameters
 *     icon, string, name and extension of the icon file from icons/ folder
 *     content, jquery object, the tab's content. Will override Panel's content
 *     maxHeight, number, maximum height of the panel
 */
class Tab {
  constructor (params = {}) {
    const contentColor = ColorConverter.hexToRgb(window.globalSettings.panelColor);

    this._tab = jQuery('<div>', {
      'class': 'tab',
    });

    this._image = jQuery('<img>', {
      src: chrome.extension.getURL(`icons/${params.icon || 'filler.png'}`),
      width:34,
      height:34,
    }).prependTo(this._tab);

    this._tab.hover((e) => {
      if (this.isActive) {
        return;
      }
      this._image.animate({
        opacity: 0.5,
      }, {
        queue: false,
        duration: TAB_ANIMATION_DURATION_MS,
      });
    }, (e) => {
      if (this.isActive) {
        return;
      }
      this._image.animate({
        opacity: 1,
      }, {
        queue: false,
        duration: TAB_ANIMATION_DURATION_MS,
      });
    });

    this._content = params.content || jQuery('<div>', {
      'text': 'Empty tab',
      'class': 'content',
      css: {
        maxHeight: params.maxHeight || '',
        backgroundColor: ColorConverter.combine(contentColor.r, contentColor.g, contentColor.b, window.globalSettings.panelOpacity),
      },
    });
  }

  get icon () {
    return this._icon || 'filler.png';
  }

  set icon (value) {
    this._icon = value;
    this._image.attr('src', chrome.extension.getURL(`icons/${value}`));
    return this;
  }

  _select() {
    this.isActive = true;
    this._image.stop().css('opacity', 1);
    this.icon = `active_${this.icon}`;
  }

  _deselect() {
    this.isActive = false;
    this._image.css('opacity', 1);
    this.icon = this.icon.replace('active_','');
  }
}
