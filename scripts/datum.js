const h2 = document.querySelector('.font-class-h2');

const today = new Date();
const formattedDate = today.toLocaleDateString('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

h2.setAttribute('data-date', formattedDate);
