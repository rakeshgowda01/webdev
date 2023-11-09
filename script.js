// Update element dynamicaly

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xTwitterButton = document.getElementById("x-twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Heart Loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Select a Random Quote from the array.

function newQuote() {
  let randomQuote = Math.floor(Math.random() * apiQuotes.length);
  let quote = apiQuotes[randomQuote];

  // If the length of quote exceeds 120 character then reduce the size of the quote.
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
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
