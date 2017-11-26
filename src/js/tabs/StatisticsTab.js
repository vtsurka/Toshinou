/*
Created by HaselLoyance on 26.11.2017
*/

class StatisticsTab extends Tab {
  constructor(params ={}) {
    super(params);

    this._content.text('').append('<h4>Statistics</h4>');

    const startTime = new Date().toLocaleString(navigator.languages[0]);
    const options = [{
      name: 'startTime',
      labelText: 'Start at: ',
      spanText: startTime,
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
    }];

    options.forEach((option)=>{
        this[option.name] = ControlFactory.info(option);
    });

    $(window).on('addCredits', (e)=>{
        const collected = parseInt($('span:last-child', this.credits).html());
        $('span:last-child', this.credits).text(parseInt(e.detail.credits)+collected);
    });

    $(window).on('addUridium', (e)=>{
        const collected = parseInt($('span:last-child', this.uridium).html());
        $('span:last-child', this.uridium).text(parseInt(e.detail.uridium)+collected);
    });

    $(window).on('addGgEnergy', (e)=>{
        const collected = parseInt($('span:last-child', this.energy).html());
        $('span:last-child', this.energy).text(parseInt(e.detail.energy)+collected);
    });

    $(window).on('addAmmo', (e)=>{
        const collected = parseInt($('span:last-child', this.ammo).html());
        $('span:last-child', this.ammo).text(parseInt(e.detail.ammo)+collected);
    });

    $(window).on('addExperience', (e)=>{
        const collected = parseInt($('span:last-child', this.experience).html());
        $('span:last-child', this.experience).text(parseInt(e.detail.experience)+collected);
    });

    $(window).on('addHonor', (e)=>{
        const collected = parseInt($('span:last-child', this.honor).html());
        $('span:last-child', this.honor).text(parseInt(e.detail.honor)+collected);
    });
  }
}
