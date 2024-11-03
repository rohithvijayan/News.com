const api_key="6e7e06236b6f422ebb6a0fa21532e4c5"

const blog_container=document.getElementById("blog-container");

const searchForm=document.getElementById("search-input");
const searchbtn=document.getElementById("search-btn");

async function fetchRandomNews(searchTerm){
    try{       
        const api_url=`https://newsapi.org/v2/everything?q=APPLE&language=en&sortBy=popularity&pageSize=1&apiKey=${api_key}`
        const response=await fetch(api_url)
        const data= await response.json()
        //console.log(data)
        data.articles.forEach(article=>{console.log(article['title']),console.log(article['url'])})
        return data.articles;
    }
    catch(error){
        console.error("error fetching random news",error);
        return [];
    }
}

async function searchNews(searchTerm){
    try{
        let query=searchTerm
        console.log('query is:',query);
        const searchurl=`https://newsapi.org/v2/top-headlines?q=${query}&pageSize=3&apiKey${api_key}`
        const response=await fetch(searchurl)
        const data=await response.json()
        console.log(data);
        return data.articles;
    }
    catch(error){console.log("error fetching news",Error)}

}
function displayBlogs(articles){
    blog_container.innerHTML='';
    articles.forEach((article)=>{
    const blogcard=document.createElement("div");
    blogcard.classList.add("blog-card");
    const img=document.createElement("img");
    img.classList.add("card-img");
    img.src=article.urlToImage;
    img.alt=article.title;
    const blogTitle=document.createElement("h2");
    const blodDescription=document.createElement('p')
    blogTitle.innerText=article.title;
    blodDescription.href=article.description;
    const readButton=document.createElement('button');
    readButton.classList.add("read-moreBtn")
    readButton.innerText="Read More";
    const blogLink=document.createElement('a');
    blogLink.href=article.url;
    blogLink.appendChild(readButton);
    blogcard.appendChild(img)
    blogcard.appendChild(blogTitle);
    blogcard.appendChild(blodDescription);
    blogcard.appendChild(blogLink);
    blog_container.appendChild(blogcard);
    
    })
}
(async ()=>{
    try{
        searchbtn.addEventListener("click",async()=>{
            blog_container.innerHTML='';
            let searchTerm=searchForm.value.trim();
            console.log('form input is;',searchTerm);
            const articles= await searchNews(searchTerm);
            displayBlogs(articles);
        })
        const articles=await fetchRandomNews();
        displayBlogs(articles );
        console.log(articles)
    }
    catch(error){
        console.error("error fetching news from db",error);

    }

})();
