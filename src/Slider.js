const SliderControls = function(slider, prev, next) {
	this.prev = prev;
	this.next = next;

	this.prev.addEventListener('click', function() {
		slider.prev();
	});

	this.next.addEventListener('click', function() {
		slider.next();
	});
};

const Slide = function(el) {
	this.origin = el;
	// this.initialState = { ...this.origin };
};

const Slider = function(root, options = {}) {
	this.defaults = {
		classes: {
			itemSelected: 'selected'
		}
	};

	this.root = root;
	this.options = options;
	this.slides = this.getSlides();

	const slideClickHandler = (function(event) {
		this.slides.forEach((slide, index) => {
			if (slide === event.target) {
				this.pick(index);
			}
		});
	}).bind(this);

	this.root.addEventListener('click', slideClickHandler);

	this.navigation = {
		current: this.guessCurrentSlideIdx(),
	};

	this.controls = new SliderControls(
		this,
		document.getElementById('prev'),
		document.getElementById('next'),
	);
};

Slider.prototype.getNavi = function() {
	let prev = 0;

	if ((this.navigation.current - 1) > 0) {
		prev = (this.navigation.current - 1);
	}  else if ((this.navigation.current - 1) < 0) {
		prev = this.slides.length - 1;
	} else {
		prev = 0;
	}

	let next = (this.navigation.current + 1) <= (this.slides.length - 1)
		? (this.navigation.current + 1)
		: 0;

	return {
		prev,
		next
	};
};

Slider.prototype.guessCurrentSlideIdx = function() {
	if (this.options.hasOwnProperty('first')) {
		return this.options.first;
	} else {
		let { itemSelected } = this.defaults.classes;
		let guess = 0;

		this.slides.forEach((slide, index) => {
			if (slide.classList.contains(itemSelected)) {
				guess = index;
			}
		});

		return guess;
	}
};

Slider.prototype.getSlides = function() {
	return Array.from(this.root.querySelectorAll('.slider__item'));
}

Slider.prototype.firstSlide = function() {
	let { slides } = this;
	return slides[0];
};

Slider.prototype.lastSlide = function() {
	let { slides } = this;
	return slides[slides.length - 1];
};

Slider.prototype.pick = function(index) {
	let { itemSelected } = this.defaults.classes;
	let classSelector = itemSelected;

	this.navigation.current = index;

	this.slides.forEach(slide => {
		if (slide.classList.contains(classSelector)) {
			slide.classList.remove(classSelector);
		}
	});

	this.slides[this.navigation.current].classList.add(classSelector);
};

Slider.prototype.prev = function() {
	let { prev } = this.getNavi();
	this.pick(prev);
};

Slider.prototype.next = function() {
	let { next } = this.getNavi();
	this.pick(next);
};

HTMLElement.prototype.slider = function slider(options = {}) {
	return new Slider(this, options);
};

let sliderEl1 = document.getElementById('slider1');
let sliderEl2 = document.getElementById('slider2');

let slider1 = sliderEl1.slider();
let slider2 = sliderEl2.slider();

console.log(slider1);
