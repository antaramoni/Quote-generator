const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API

async function getQuote() {
  loading();

  const proxyURL = "https://radiant-hollows-94569.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  // if there is no author or author field is blank, print Unknown
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    if (data.quoteText === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // stop loader and show the quote
    complete();
  } catch (error) {
    getQuote();
    console.log("Opps! no quote found! ", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote}  - ${author}`;
  window.open(twitterURL, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
