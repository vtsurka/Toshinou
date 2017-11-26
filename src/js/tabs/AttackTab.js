/*
Created by HaselLoyance on 26.11.2017
*/

class AttackTab extends Tab {
  constructor(params ={}) {
    super(params);

    this._content.text('').append('<h4>Attack Details</h4>');

    this.targetNameTxt = jQuery('<h4>');
    this.targetNameTxt.text('Target: -');

    this.hpTxt = jQuery('<h4>');
    this.hpTxt.text('HP: -');

    this.shdTxt = jQuery('<h4>');
    this.shdTxt.text('SHD: -');

    this._content.append(this.targetNameTxt)
    .append(this.hpTxt)
    .append(this.shdTxt);
  }

  removeTarget() {
    this.targetName.text('Target: -');
    this.hpTxt.text('HP: -');
    this.shdTxt.text('SHD: -');
  }

  targetName(value) {
    this.targetNameTxt.text('Target: ' + value);
  }

  hp(value) {
    this.hpTxt.text('HP: ' + value);
  }

  shd(value) {
    this.shdTxt.text('SHD: ' + value);
  }
}
