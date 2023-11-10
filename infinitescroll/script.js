const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let page = 1
let totalPages = 1
let photosArray = [];

// Unsplash API
const API_KEY = "qFIn5Yo_i3McGDfF90TZLvMNoXX5spWNSXZBKxu2rac";
const COUNT = 30;
const QUERY = "Diwali";
let API_URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${page}&query=${QUERY}`;

// Check if all images were loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true
  }
}

//Generate HTML element dynamically to display each images.

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", photo.links.html);
    anchor.setAttribute("target", "_blank");

    // Create Image for Photos

    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.description);
    image.setAttribute("title", photo.alt_description);

    // Event Listener, Check when each is finished loading.
    image.addEventListener("load", imageLoaded);

    // Place image inside anchor, then place both inside imageContainer Element
    anchor.appendChild(image);
    imageContainer.appendChild(anchor);
  });
}

// API call to get list of all the images
async function getUnsplashImages() {
  try {
    API_URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${page}&query=${QUERY}`
    const response = await fetch(API_URL);
    const data = await response.json();
    totalPages = data.total_pages
    photosArray = data.results;
    displayPhotos();
  } catch (error) {
    window.alert("Please try again later. ;)")
  }
}

// Check to see if scrolling near botton of page, Load more photos

window.addEventListener("scroll", () => {
  // scrollY: Distance from top, the user has scrolled.
  // innerHeight: Total height of browser window i.e. visible to browser.
  // offsetHeight: Height of everything in the body, including what is not within view.

  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    ready
  ) {
    ready = false;
    if (page === totalPages) {
        page = 1
    } else {
        page++
    }
    getUnsplashImages()
  }
});

// On Load
getUnsplashImages();
