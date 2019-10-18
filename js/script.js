const searchForm = document.querySelector('#search-form'),
        message = document.querySelector('.message'),
        articlesDiv = document.querySelector('.articles');

allArticles = () => {
    articlesApi()
        .then(res => {
            const articles = res.res.articles;
            displayTopHeadlines(articles);
        });
}

displayTopHeadlines = articles => {
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('col', 's12', 'l12', 'z-depth-3', 'blue-grey', 'lighten-3', 'article-col');
        articleDiv.innerHTML = `
                <h5>${article.title}</h5>
                <p>${article.content}</p>
            `;
            articlesDiv.appendChild(articleDiv);
    })
}

const displayArticles = e => {
    e.preventDefault();
    removeArticle();
    showArticles();
}

showArticles = () => {
    let searchArticle = document.querySelector('#title').value;

    if(searchArticle === '') {
        message.textContent = `Please put in an article title or topic`;
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000); 
    } else {
        articlesApi()
            .then(res => {
                const articles = res.res.articles;
                showArticle(articles);
            });
    }
} 

showArticle = articles => {
    let searchArticle = document.querySelector('#title').value;
    articles.forEach(article => {
        const title = article.title,
                content = article.content;
        if(title.includes(searchArticle) === true) {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('col', 's12', 'l12', 'z-depth-3', 'blue-grey', 'lighten-3', 'article-col');
            articleDiv.innerHTML = `
                <h5>${title}</h5>
                <p>${content}</p>
            `;
            articlesDiv.appendChild(articleDiv);
        } 
    });
}

removeArticle = () => {
    articlesDiv.innerHTML = '';
}

articlesApi = async () => {
    const url = await fetch('https://newsapi.org/v2/top-headlines?country=ng&apiKey=ded11b705b3c45c5b2d025db69841fb2');
    const res = await url.json();
    return {
        res
    }
}

searchForm.addEventListener('submit', displayArticles);
document.addEventListener('DOMContentLoaded', allArticles);
