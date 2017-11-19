class StatisticWindow {

    createWindow(){
        this.botStatisticWindow = WindowFactory.createWindow({width: 300, text: "Statistic"});

        let startTime = new Date().toLocaleString(navigator.languages[0]);

        let options = [
            {
                name: 'startTime',
                labelText: 'Start at: ',
                spanText: startTime,
                appendTo: this.botStatisticWindow
            },
            {
                name: 'credits',
                labelText: 'Credits: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
            {
                name: 'uridium',
                labelText: 'Uridium: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
            {
                name: 'energy',
                labelText: 'GG Energy: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
            {
                name: 'ammo',
                labelText: 'Ammo: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
            {
                name: 'experience',
                labelText: 'Experience: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
            {
                name: 'honor',
                labelText: 'Honor: ',
                spanText: '0',
                appendTo: this.botStatisticWindow
            },
        ];

        options.forEach((option)=>{
            this[option.name] = ControlFactory.info(option);
        });

        $(window).on('addCredits', (e)=>{
            let collected = parseInt($('span:last-child', this.credits).html());
            $('span:last-child', this.credits).text(parseInt(e.detail.credits)+collected);
        });

        $(window).on('addUridium', (e)=>{
            let collected = parseInt($('span:last-child', this.uridium).html());
            $('span:last-child', this.uridium).text(parseInt(e.detail.uridium)+collected);
        });

        $(window).on('addGgEnergy', (e)=>{
            let collected = parseInt($('span:last-child', this.energy).html());
            $('span:last-child', this.energy).text(parseInt(e.detail.energy)+collected);
        });

        $(window).on('addAmmo', (e)=>{
            let collected = parseInt($('span:last-child', this.ammo).html());
            $('span:last-child', this.ammo).text(parseInt(e.detail.ammo)+collected);
        });

        $(window).on('addExperience', (e)=>{
            let collected = parseInt($('span:last-child', this.experience).html());
            $('span:last-child', this.experience).text(parseInt(e.detail.experience)+collected);
        });

        $(window).on('addHonor', (e)=>{
            let collected = parseInt($('span:last-child', this.honor).html());
            $('span:last-child', this.honor).text(parseInt(e.detail.honor)+collected);
        });
        
    }

}