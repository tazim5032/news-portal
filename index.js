const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();

    const categoryContainer = document.getElementById('categories');
    data.data.news_category.forEach((item) => {
        //console.log(item.category_name);
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadNews('${item.category_id}')" class="btn btn-info font-bold text-white">${item.category_name}</button>
        `;
        categoryContainer.appendChild(div);
    });
}

const loadNews = async (catId) =>{
    //console.log(catId);
    document.getElementById('loading-spinner').classList.remove('hidden');
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();

    const newsCard = document.getElementById('news-cards');
    newsCard.textContent = '';
    data.data.forEach((item) =>{
        document.getElementById('loading-spinner').classList.add('hidden');
        const div = document.createElement('div');
        div.classList.add('hero', 'bg-base-200', 'border-2', 'border-red-400', 'rounded-xl');
        div.innerHTML = `
        <div class="hero-content flex-col lg:flex-row">
            <img src="${item.thumbnail_url}" class="max-w-sm rounded-lg shadow-2xl" />
            <div>
                <h1 class="text-5xl font-bold">${item.title}</h1>
                <p>Rating: ${item.rating.number}</p>
                <p class="py-6">${item.details.slice(0, 200)}</p>
                <button class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        newsCard.appendChild(div);
        
    });
    newsCard.classList.add('grid', 'gap-10');
}

const searchId = () =>{
    const input = document.getElementById('input-id').value;
    
    if(input){
        loadNews(input);
        document.getElementById('input-id').value='';
        
    }
    else{
        alert('Please Enter a valid Id');
    }
}

loadCategory();
loadNews('01');