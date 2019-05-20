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
		const buttons = document.querySelectorAll(`#carouselTeam a`);
		console.log(buttons);
		buttons.forEach(button =>
			button.addEventListener('click', e => {
				this.changeSlide(e);
			}),
		);
	}
	changeSlide(e) {
		let direction = e.target.dataset.control;
		this.carouselPosition[this.currentSlideIndex].deSelect();
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
	}
	deSelect() {
		this.content.classList.remove(`active`);
	}
	select() {
		this.content.classList.add(`active`);
	}
}

new Carousel();
