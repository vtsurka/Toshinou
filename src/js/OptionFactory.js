class OptionFactory {

    static createOption({
        type="checkbox",
        labelText,
        labelBefore=false,
        appendTo,
        br=true,
        eventType="change",
        event = ()=> {},
        attrs = {},
    }) {
        let option = jQuery("<input>");
        option.attr("type", type);

        Object.keys(attrs).forEach((name)=> {
            option.attr(name, attrs[name]);
        });

        let label = jQuery("<label>");
        label.html(labelText);

        if (labelBefore) {
            label.appendTo(appendTo);
        }

        option.appendTo(appendTo);

        if (!labelBefore) {
            label.appendTo(appendTo);
        }

        if (br) {
            jQuery("<br>").appendTo(appendTo);
        }

        option[eventType](function (ev) {
            this.option = option;
            this.label = label;
            event.call(this, ev);
        });

        return {option, label};
    }

}
