const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const twitterBtn = document.getElementById('tweeter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
loading(false, true);
//getting quote from api
async function getQuote() {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl =
		'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		// quoteContainer.style.display = 'block';
		// loader.style.display = 'none';
		loading(true, false);
		quote.innerText = data.quoteText;
		if (data.quoteAuthor === '') {
			author.innerText = 'Unknown';
		} else {
			author.innerText = data.quoteAuthor;
		}
		if (data.quoteText.length > 120) {
			quote.classList.add('long-quote');
		} else {
			quote.classList.remove('long-quote');
		}
	} catch (err) {
		getQuote();
		loading(false, true);
	}
}
getQuote();

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

function tweetQuote() {
	const tweetQuote = quote.innerText;
	const tweetAuthor = author.innerText;
	const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetQuote} - ${tweetAuthor}`;
	window.open(tweetUrl, '_blank');
}

function loading(isloading, ishidden) {
	loader.hidden = isloading;
	quoteContainer.hidden = ishidden;
}
