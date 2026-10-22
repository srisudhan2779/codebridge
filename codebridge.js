const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

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