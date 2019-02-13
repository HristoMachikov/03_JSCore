function getArticleGenerator(articles) {
    let initialArray = (function () {
        let counter = 0;
        return () => counter++;
    })();

    return function () {
        let parentEelm = document.getElementById('content')
        let numb = initialArray()
        if (numb < articles.length) {
            let article = document.createElement('article');
            article.textContent = articles[numb];
            parentEelm.appendChild(article);
        }
    }
}