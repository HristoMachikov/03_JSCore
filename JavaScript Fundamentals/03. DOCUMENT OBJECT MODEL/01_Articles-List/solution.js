function solve() {
	let createTitleElement = document.getElementById("createTitle");
	let createContentElement = document.getElementById("createContent");
	let createArticleList = document.getElementById("articles");

	let createTitleValue = createTitleElement.value;
	let createContentValue = createContentElement.value;

	if (createTitleValue && createContentValue) {
		let titleElement = document.createElement('h3');
		titleElement.textContent = createTitleValue;

		let contentElement = document.createElement('p');
		contentElement.textContent = createContentValue;

		let articleElement = document.createElement('article');
		articleElement.appendChild(h3);
		articleElement.appendChild(p);
		createArticleList.appendChild(articleElement);
	};

	
};