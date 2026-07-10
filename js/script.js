// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');
const fetchButton = document.getElementById('fetchButton');

const API_KEY = 'TCAMnBXTO6phdlrzbCGZ4tBEWsFUKp006ufQizL8';

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

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

function renderImages(images) {
  if (!images || images.length === 0) {
    showPlaceholder('No space images were found for that date range.');
    return;
  }

  const imageCards = images
    .filter((entry) => entry.media_type === 'image')
    .map((entry) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
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
      showPlaceholder('The NASA API could not be reached. Please try again later.');
    });
}

showPlaceholder('Select a date range and click "Get Space Images" to explore the cosmos!');
fetchButton.addEventListener('click', getSpaceImages);
