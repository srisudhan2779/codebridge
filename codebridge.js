const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const quizOptions = document.querySelectorAll('.quiz-option');
const quizFeedback = document.querySelector('#quiz-feedback');

quizOptions.forEach((option) => {
	option.addEventListener('click', () => {
		const isCorrect = option.dataset.correct === 'true';
		quizOptions.forEach((button) => {
			button.setAttribute('aria-pressed', String(button === option));
			button.classList.toggle('selected', button === option);
		});
		if (quizFeedback instanceof HTMLElement) {
			quizFeedback.textContent = isCorrect
				? 'That’s right! print() displays the value as output.'
				: 'Not quite. print() displays a value as output. Try again!';
			quizFeedback.classList.toggle('is-correct', isCorrect);
			quizFeedback.classList.toggle('is-incorrect', !isCorrect);
		}
	});
});

const levelFilters = document.querySelectorAll('.level-filter');
const lessonCards = document.querySelectorAll('.class-grid .lesson-card');
const filterStatus = document.querySelector('#filter-status');

function filterLessons(level) {
	let visibleCount = 0;
	lessonCards.forEach((card) => {
		const isVisible = level === 'all' || card.getAttribute('data-level') === level;
		card.classList.toggle('is-hidden', !isVisible);
		if (isVisible) visibleCount += 1;
	});

	levelFilters.forEach((button) => {
		const isActive = button.getAttribute('data-level') === level;
		button.classList.toggle('active', isActive);
		button.setAttribute('aria-pressed', String(isActive));
	});

	if (filterStatus instanceof HTMLElement) {
		filterStatus.textContent = level === 'all'
			? `Showing all ${visibleCount} classes`
			: `Showing ${visibleCount} ${level} classes`;
	}
}

levelFilters.forEach((button) => {
	button.addEventListener('click', () => {
		filterLessons(button.getAttribute('data-level') ?? 'all');
	});
});

function syncPageWithHash() {
	const hash = window.location.hash.slice(1);
	if (['beginner', 'intermediate', 'advanced'].includes(hash)) {
		filterLessons(hash);
	}

	const lesson = document.getElementById(hash);
	if (lesson instanceof HTMLDetailsElement) {
		lesson.open = true;
	}
}

window.addEventListener('hashchange', syncPageWithHash);
syncPageWithHash();

document.querySelectorAll('.lesson-button').forEach((link) => {
	link.addEventListener('click', () => {
		const lesson = document.getElementById(link.hash.slice(1));
		if (lesson instanceof HTMLDetailsElement) {
			lesson.open = true;
		}
	});
});

if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();
		formStatus.textContent = 'This form is not connected to a submission service yet, so your message was not sent. Configure a backend before sending messages.';
	});

	contactForm.addEventListener('input', () => {
		formStatus.textContent = '';
	});
}