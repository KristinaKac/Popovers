export default class Popovers {
    constructor() {
        this.popovers = [];
    }

    static get getPopover() {
        const div = document.createElement('div');
        div.classList.add('popover');
        return div;
    }

    showPopover(message, element) {
        const popover = Popovers.getPopover;
        popover.innerText = message;
        const id = performance.now();
        element.dataset.id = id;

        this.popovers.push({
            id,
            popover: popover,
        });

        document.body.appendChild(popover);

        const { left, top } = element.getBoundingClientRect();

        let popoverTop = top - popover.offsetHeight - 5;
        let popoverLeft = left + (element.offsetWidth - popover.offsetWidth) / 2;

        if (popoverLeft < 0) popoverLeft = 5;
        if (popoverTop < 0) popoverTop = top + element.offsetHeight + 5;

        popover.style.left = popoverLeft + 'px';
        popover.style.top = popoverTop + 'px';

        return id;
    }

    removePopover(id) {
        const popover = this.popovers.find(item => item.id == id);
        popover.popover.remove();
    }
}