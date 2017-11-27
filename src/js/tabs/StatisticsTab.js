/*
Created by HaselLoyance on 26.11.2017
*/

class StatisticsTab extends Tab {
  constructor(params ={}) {
    super(params);

    this._content.text('').append('<h4>Statistics</h4>');

    this.connected = false;
    const startTime = new Date();

    const options = [{
      name: 'startTime',
      labelText: 'Start at: ',
      spanText: startTime.toLocaleString(navigator.languages[0]),
      appendTo: this._content,
    }, {
      name: 'credits',
      labelText: 'Credits: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'uridium',
      labelText: 'Uridium: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'energy',
      labelText: 'GG Energy: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'ammo',
      labelText: 'Ammo: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'experience',
      labelText: 'Experience: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'honor',
      labelText: 'Honor: ',
      spanText: '0',
      appendTo: this._content,
    }, {
      name: 'speed',
      labelText: 'Speed: ',
      spanText: '0.00 uri/min.',
      appendTo: this._content
    }];

    if (window.globalSettings.showRuntime) {
      options.push({
        name: 'runtime',
        labelText: 'Runtime: ',
        spanText: '00:00:00',
        appendTo: this._content,
      });
    }

    options.forEach((option)=> {
      this[option.name] = ControlFactory.info(option);
    });

    let standardListeners = [
      {event: 'addCredits', el: 'credits', detailEl: 'credits'},
      {event: 'addUridium', el: 'uridium', detailEl: 'uridium'},
      {event: 'addGgEnergy', el: 'energy', detailEl: 'energy'},
      {event: 'addAmmo', el: 'ammo', detailEl: 'ammo'},
      {event: 'addExperience', el: 'experience', detailEl: 'experience'},
      {event: 'addHonor', el: 'honor', detailEl: 'honor'},
    ];

    standardListeners.forEach((item)=> {
      this.setStandardEventListener(item);
    });

    $(window).on('connection', (e)=> {
      this.connected = e.detail.connected;
    });

    $(window).on('logicEnd', ()=> {
      if (this.connected) {
        let uri = parseInt($('span:last-child', this.uridium).html());
        if (window.globalSettings.showRuntime) {
          $('span:last-child', this.runtime).text(TimeHelper.diff(startTime));
        }
        $('span:last-child', this.speed).text((uri ? ( uri / TimeHelper.totatalMinutes(startTime)).toFixed(2) : '0.00') + '  uri/min.');
      }
    });
  }

  setStandardEventListener({event, el, detailEl}) {
    let htmlEl = this[el];
    $(window).on(event, (e)=> {
      let el = $('span:last-child', htmlEl);
      let collected = parseInt(el.html());
      el.text(parseInt(e.detail[detailEl]) + collected);
    });
  }
}
