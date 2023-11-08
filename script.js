// Update element dynamicaly

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xTwitterButton = document.getElementById("x-twitter");
const newQuoteButton = document.getElementById("new-quote");
const heartLoader = document.getElementById("heart-loader");
const innerHeartLoader = document.getElementById("inner-heart-loader");

let apiQuotes = [];

// Show Heart Loader

function loading() {
  heartLoader.hidden = false;
  quoteContainer.hidden = true;
  innerHeartLoader.hidden = false
}

function complete() {
  heartLoader.style.display = true;
  quoteContainer.hidden = false;
  innerHeartLoader.hidden = true

}

// Select a Random Quote and assign it to quote and author id

function newQuote() {
  loading()
  let randomQuote = Math.floor(Math.random() * apiQuotes.length);
  let quote = apiQuotes[randomQuote];

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  complete()
}

// Get Quotes from API
async function getQuotes() {
  loading()
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    apiQuotes = apiQuotes.filter((quote) => quote.tag === "motivational");
    newQuote();
  } catch (error) {
    // Handle Error or Catch it as alert
  }
}

// Tweet Quote
function tweetQuote() {
  const twiterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twiterURL, "_blank");
}

// Event Listeners for button

newQuoteButton.addEventListener("click", newQuote);
xTwitterButton.addEventListener("click", tweetQuote);

// On Load
getQuotes();
