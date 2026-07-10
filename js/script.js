// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');
const fetchButton = document.getElementById('fetchButton');
const modalElement = document.getElementById('apodModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('apodModalLabel');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const spaceFactText = document.getElementById('spaceFactText');

const API_KEY = 'TCAMnBXTO6phdlrzbCGZ4tBEWsFUKp006ufQizL8';
const randSpaceFacts = ['Mercury & Venus are the only 2 planets in our solar system that have no moons.', 'Our solar system is 4.57 billion years old.','The highest mountain discovered is the Olympus Mons, which is located on Mars.','A light-year is the distance covered by light in a single year.','The Sun weighs about 330,000 times more than Earth.','There are 79 known moons orbiting Jupiter.'];
let apodEntries = [];

// Create a Bootstrap modal object so we can open and close it in JavaScript.
const apodModal = new bootstrap.Modal(modalElement);

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Show a random space fact on each page load or refresh.
function showRandomSpaceFact() {
  if (!spaceFactText) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * randSpaceFacts.length);
  spaceFactText.textContent = randSpaceFacts[randomIndex];
}

function showPlaceholder(message) {
  gallery.innerHTML = `
    <div class="col-12">
      <div class="placeholder">
        <div class="placeholder-icon">🔭</div>
        <p>${message}</p>
      </div>
    </div>
  `;
}

// Store the API response in an array so each card can open the matching APOD details.
function renderImages(images) {
  const imageEntries = (images || [])
  .filter((entry) => entry.media_type === 'image')
  .slice(0, 9); // limit to up to 9 images
  apodEntries = imageEntries;

  if (imageEntries.length === 0) {
    showPlaceholder('No space images were found for that date range.');
    return;
  }

  const imageCards = imageEntries
    .map((entry, index) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm gallery-card" tabindex="0" role="button" data-index="${index}" aria-label="View details for ${entry.title}">
          <img src="${entry.url}" class="card-img-top" alt="${entry.title}" />
          <div class="card-body">
            <h2 class="card-title">${entry.title}</h2>
            <p class="card-text">${entry.date}</p>
          </div>
        </div>
      </div>
    `)
    .join('');

  gallery.innerHTML = imageCards;
}

// Populate the reusable modal with the selected APOD entry.
function populateModal(entry) {
  if (!entry) {
    return;
  }

  const imageSource = entry.hdurl || entry.url;

  modalImage.src = imageSource;
  modalImage.alt = `${entry.title} Astronomy Picture of the Day`;
  modalTitle.textContent = entry.title;
  modalDate.textContent = entry.date;
  modalExplanation.textContent = entry.explanation || 'No explanation available.';
}

// Open the modal when a gallery card is clicked or activated with the keyboard.
function openModalForEntry(index) {
  const selectedEntry = apodEntries[index];

  if (!selectedEntry) {
    return;
  }

  populateModal(selectedEntry);
  apodModal.show();
}

// Use event delegation so the modal works for cards created dynamically from the API response.
function handleCardClick(event) {
  const card = event.target.closest('.gallery-card');

  if (!card) {
    return;
  }

  const index = Number(card.getAttribute('data-index'));
  openModalForEntry(index);
}

function handleCardKeydown(event) {
  const card = event.target.closest('.gallery-card');

  if (!card) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    const index = Number(card.getAttribute('data-index'));
    openModalForEntry(index);
  }
}

function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  showPlaceholder('Loading cosmic images...');

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Unable to load APOD data.');
      }
      return response.json();
    })
    .then((data) => {
      renderImages(data);
    })
    .catch(() => {
      apodEntries = [];
      showPlaceholder('The NASA API could not be reached. Please try again later.');
    });
}

showRandomSpaceFact();
showPlaceholder('Select a date range and click "Get Space Images" to explore the cosmos!');
gallery.addEventListener('click', handleCardClick);
gallery.addEventListener('keydown', handleCardKeydown);
fetchButton.addEventListener('click', getSpaceImages);
