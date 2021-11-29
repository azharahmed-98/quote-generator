let apiQuotes = [];
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Showing a random quote
function newQuote() {
  const quoteIndex = Math.floor(Math.random() * apiQuotes.length);
  authorText.textContent = apiQuotes[quoteIndex].author
    ? apiQuotes[quoteIndex].author
    : "Unknown";
  // authorText.textContent = 'Syed Adnan Zaid'
  if (apiQuotes[quoteIndex].text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = apiQuotes[quoteIndex].text;
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Getting Quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  loading();
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    complete();
  } catch (error) {
    // Catch the error
  }
}

// On load
getQuotes();

// Update the dom for the api request
newQuoteBtn.addEventListener("click", getQuotes);

twitterBtn.addEventListener("click", tweetQuote);
