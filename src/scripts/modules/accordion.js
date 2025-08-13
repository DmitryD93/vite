export default class Accordion {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);

        const defaultOptions = {
            transition: 'height 0.3s ease',
            multiple: false
        };

        this.options = { ...defaultOptions, ...options };
        if (!this.container) {
            console.error(`Селектор аккордеона не найден: ${containerSelector}`);
            return;
        }

        this.items = this.container.querySelectorAll('.acc__item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const trigger = item.querySelector('.acc__trigger');
            const content = item.querySelector('.acc__content');
            // Изначально скрытый контент
            content.style.height = '0';
            content.style.overflow = 'hidden';
            content.style.transition = this.options.transition;

            trigger.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const content = item.querySelector('.acc__content');
        const isOpen = item.classList.contains('active');

        if (!this.options.multiple) {
            this.closeAllItems();
        }

        if (!isOpen) {
            item.classList.add('active');
            content.style.height = `${content.scrollHeight}px`;
        } else {
            item.classList.remove('active');
            content.style.height = '0';
        }
    }

    closeAllItems() {
        this.items.forEach(item => {
            item.classList.remove('active');
            const content = item.querySelector('.acc__content');
            content.style.height = '0';
        });
    }
}


