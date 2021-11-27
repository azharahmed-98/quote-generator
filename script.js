let apiQuotes = [];
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote");

// Showing a random quote
function newQuote() {
  const quoteIndex = Math.floor(Math.random() * apiQuotes.length);
  authorText.textContent = apiQuotes[quoteIndex].author
    ? apiQuotes[quoteIndex].author
    : "Unknown";
  if (apiQuotes[quoteIndex].text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = apiQuotes[quoteIndex].text;
}

// Getting Quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch the error
  }
}

// On load
getQuotes();

// Update the dom for the api request
twitterBtn