const axios = require(`axios`);
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function getPagesLength(url) {
	const raw = await axios.get(url);
	const dom = new JSDOM(raw.data);

	let result = 1;
	const number = dom.window.document.getElementsByClassName('next_page').item(0)
		?.previousElementSibling?.innerHTML;

	if (number !== undefined && number !== '') {
		result = parseInt(number, 10);
	}

	return result;
}

async function getQuoteElements(url) {
	const raw = await axios.get(url);
	const dom = new JSDOM(raw.data);

	return dom.window.document.getElementsByClassName('quoteText');
}

function between(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

exports.getQuote = async (tag) => {
	const url = `https://www.goodreads.com/quotes/tag/${tag}`;

	const pages = await getPagesLength(url);
	const index = between(pages, 1);

	const quotes = await getQuoteElements(`${url}?page=${index}`);
	const quoteIndex = Math.random(quotes.length - 1);

	const quoteItem = quotes.item(quoteIndex);

	if (quoteItem == null) {
		return null;
	}
	const quoteTexts = quoteItem.firstChild.wholeText.trim().slice(1, -1);
	const quoteAuthor = quoteItem?.childNodes
		.item(3)
		?.textContent?.trim()
		.split(',')[0]
		.trim();

	return {
		text: quoteTexts,
		author: quoteAuthor ?? null,
	};
};
