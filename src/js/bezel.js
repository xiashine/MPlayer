class Bezel {
    constructor (container) {
        this.container = container;

        this.container.addEventListener('animationend', () => {
            this.container.classList.remove('dplayer-bezel-show');
            this.container.classList.remove('dplayer-bezel-transition');
        });
    }

    switch (icon) {
        this.container.innerHTML = icon;
        this.container.classList.remove('dplayer-bezel-show');
        this.container.classList.add('dplayer-bezel-transition');
    }

    show(icon)
    {
        this.container.innerHTML = icon;
        this.container.classList.add('dplayer-bezel-show');
    }
    hide()
    {
        this.container.classList.remove('dplayer-bezel-show');
    }
}

export default Bezel;