// Control the Carousel

class Carousel {
	constructor() {
		const carouselSlides = document.querySelectorAll(`ol li`);
		this.carouselPosition = [];
		carouselSlides.forEach(slide => {
			this.carouselPosition = [ ...this.carouselPosition, new CarouselIndicator(slide) ];
		});
		this.currentSlideIndex = 0;
		this.slideTotalCount = carouselSlides.length;
		const carouselControls = document.querySelectorAll(`#carouselTeam a`);
		carouselControls.forEach(button =>
			button.addEventListener('click', e => {
				this.changeSlide(e);
			}),
		);
	}
	changeSlide(e) {
		const direction = e.target.dataset.control;
		const previousIndex = this.currentSlideIndex;
		if (direction === 'next') {
			this.currentSlideIndex === this.slideTotalCount - 1
				? (this.currentSlideIndex = 0)
				: (this.currentSlideIndex = this.currentSlideIndex + 1);
		} else {
			this.currentSlideIndex === 0
				? (this.currentSlideIndex = this.slideTotalCount - 1)
				: (this.currentSlideIndex = this.currentSlideIndex - 1);
		}
		this.carouselPosition[this.currentSlideIndex].select();
		this.carouselPosition[previousIndex].deSelect();
	}
}

class CarouselIndicator {
	constructor(item) {
		this.item = item;
		this.data = this.item.dataset.indicator;
		this.content = document.querySelector(`div[data-content="${this.data}"]`);
		this.carouselContent = new CarouselContent(this.content);
	}
	deSelect() {
		this.item.classList.remove(`active`);
		this.carouselContent.deSelect();
	}
	select() {
		this.item.classList.add(`active`);
		this.carouselContent.select();
	}
}

class CarouselContent {
	constructor(content) {
		this.content = content;
		this.data = this.content.dataset.content;
		this.link = document.querySelector(`.links[data-link="${this.data}"]`);
		this.carouselLinks = new CarouselLinks(this.link);
	}
	deSelect() {
		this.content.classList.remove('active');
		this.carouselLinks.deSelect();
	}
	select() {
		this.addAnimation('vanishIn');
		this.content.classList.add(`active`);
		setTimeout(() => {
			this.removeAnimation('vanishIn');
		}, 1000);
		this.carouselLinks.select();
	}
	addAnimation(animationClassName) {
		this.content.classList.add('magictime', animationClassName);
	}
	removeAnimation(animationClassName) {
		this.content.classList.remove('magictime', animationClassName);
	}
}

class CarouselLinks {
	constructor(links) {
		this.links = links;
	}
	deSelect() {
		this.links.classList.remove('selected');
	}
	select() {
		this.addAnimation('foolishIn');
		this.links.classList.add('selected');
		setTimeout(() => {
			this.removeAnimation('foolishIn');
		}, 1000);
	}
	addAnimation(animationClassName) {
		this.links.classList.add('magictime', animationClassName);
	}
	removeAnimation(animationClassName) {
		this.links.classList.remove('magictime', animationClassName);
	}
}

new Carousel();
