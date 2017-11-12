/*
Created by Freshek on 11.11.2017
*/

class NpcSettingsWindow {
  createWindow() {
    this.npcSettingsWindow = WindowFactory.createWindow({width: 300, height: 200, text: "NPC Killer Settings", scrollable: true});

    this.knownNpcList.forEach(n => {
      jQuery("<input>").attr("type", "checkbox").change(function() {
        window.setings.setNpc(n, this.checked);
      }).appendTo(this.npcSettingsWindow);
      jQuery("<label>").text(n).appendTo(this.npcSettingsWindow);
      jQuery("<br>").appendTo(this.npcSettingsWindow);
    });
  }

  get knownNpcList() {
    return [
      "-=[ Streuner ]=-",
      "-=[ Aider Streuner ]=-",
      "-=[ Recruit Streuner ]=-",
      "-=[ Lordakia ]=-",
      "-=[ Devolarium ]=-",
      "-=[ Mordon ]=-",
      "-=[ Sibelon ]=-",
      "-=[ Saimon ]=-",
      "-=[ Lordakium ]=-",
      "-=[ Sibelonit ]=-",
      "-=[ Kristallin ]=-",
      "-=[ Kristallon ]=-",
      "-=[ StreuneR ]=-",
      "-=[ Protegit ]=-",
      "-=[ Cubikon ]=-"
    ];
  }
}
