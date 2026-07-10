# Prompt 1

Create a responsive web page using HTML, Bootstrap 5, CSS, and JavaScript that displays Astronomy Picture of the Day (APOD) images from the NASA APOD API, for example https://api.nasa.gov/planetary/apod
    ?api_key=YOUR_API_KEY
    &start_date=2024-07-01
    &end_date=2024-07-07.

Using given variables in script

const API_KEY = YOUR_API_KEY;
const startInput = "YYYY-MM-DD";
const endInput = "YYYY-MM-DD";

Use the NASA APOD endpoint:

https://api.nasa.gov/planetary/apod
Make a single fetch() request using the start_date, end_date, and api_key query parameters.
The API response should contain exactly 9 APOD entries.

Use the Bootstrap 5 grid system.
Display the results as responsive cards:
3 cards per row on large screens (col-lg-4)
2 cards per row on medium screens (col-md-6)
1 card per row on small screens (col-12)
Each card should contain:
APOD image (ignore entries where media_type is "video")
Image title
Date
Use Bootstrap's Card component.
Make every image the same height using object-fit: cover.
Cards should all have equal height.
Ensure padding for smaller devices