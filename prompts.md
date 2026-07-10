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

# Prompt 2

Enhance the existing NASA APOD Bootstrap gallery by making every gallery card interactive.

When a user clicks anywhere on a gallery card (image or card body), open a Bootstrap 5 Modal displaying the complete details for that Astronomy Picture of the Day entry.


The modal should display:

A larger version of the selected APOD image.
The full APOD title.
The APOD date.
NASA's complete explanation text returned by the API.
The image should scale responsively while maintaining its aspect ratio.
If an hdurl exists, use it for the enlarged image; otherwise use url.
Bootstrap Requirements
Use the official Bootstrap 5 Modal component.
Only create one reusable modal in the HTML.
Populate the modal dynamically with JavaScript when a gallery card is clicked.
Do not generate a separate modal for each image.

Clicking any gallery card should:

Determine which APOD object was clicked.
Fill the modal with that object's information.
Open the modal.
The modal should close when:
The user clicks the Close button.
The user clicks outside the modal.
The user presses the Escape key.
JavaScript Requirements

Use modern JavaScript.

Store the API response in an array.
Use event listeners instead of inline onclick attributes.
Use Bootstrap's JavaScript API to open the modal.
Populate:
Modal image source
Modal image alt text
Modal title
Modal date
Modal explanation

Example fields available from each APOD object:

{
    title,
    date,
    explanation,
    url,
    hdurl,
    media_type
}
Accessibility
Include descriptive alt text for the enlarged image.
Ensure the modal has proper Bootstrap accessibility attributes.
Keyboard navigation should work without additional libraries.
Styling

Match the styling of the existing gallery.

Rounded image corners
Consistent card and modal spacing
Responsive image sizing
Comfortable line spacing for the explanation text
Date displayed in a muted Bootstrap text style
Title displayed prominently
Code Organization

Include comments explaining each major JavaScript section responsible for opening, populating, and closing the modal.

Do not rewrite the gallery. Extend the existing implementation by adding this functionality.

# Prompt 3
In the top left corner, place the NASA-LOGO-Large.jpg in img folder to the page while not intruding too much with the rest of the page. Go over page to make sure it adheres to Nasa branding guidelines: https://www.nasa.gov/nasa-brand-center/brand-guidelines/

# Prompt 4
Add a smooth scaling effect when users hover over gallery images. Make it sleek. At the top of the Gallery, display random space facts every page refresh using the givin array in script.js: randSpaceFacts. Make sure the texts alligns with the guideslines set and includes responsive design for different screen sizes.