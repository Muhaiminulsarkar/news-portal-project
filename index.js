try {
    const loadCategory = async () => {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        setCategoryName(data.data.news_category);
    }

    const setCategoryName = (datas) => {

        const cat = document.getElementById('category-name')
        datas.forEach(data => {
            // console.log(data.category_id);
            const p = document.createElement('p');
            p.innerHTML = `<button onclick="loadNews('${data.category_id}')" class="btn btn-sm btn-outline-primary" type="button">${data.category_name}</button>`;
            cat.appendChild(p);
        })
    }

    loadCategory();
}

catch (err) {
    console.log(err);
}


const loadNews = async (id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    //start spinner
    toggleSpinner(true)
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const sortView = (value) => {
    const sort = value.sort((a, b) => {
        return a.total_view - b.total_view;
    });
    const descending = sort.reverse();
    return descending;
}




const displayNews = (value, newsAll) => {
    // console.log(newsAll);
    sortView(value);
    console.log(value);

    const newsConatiner = document.getElementById('news-container');
    newsConatiner.textContent = '';

    const itemContainer = document.getElementById('item');
    itemContainer.textContent = '';

    //stop spinner
    toggleSpinner(false);

    /* item found part */
    if (value.length === 0) {
        itemContainer.innerHTML = `
        <div class="card-body text-danger text-center">
                    ${value.length} News Found
        </div>
        `;
        return;
    }
    else {
        itemContainer.innerHTML = `
        <div class="card-body text-danger text-center ">
                    ${value.length} News Found
        </div>
        `;
    }

    value.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 px-4" style="max-width: 80rem;">
        <div class="row my-4">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text fs-6">${news.details.slice(0, 300)} ....</p>
                    <div class="d-flex justify-content-between mt-5">
                        <div class="d-flex gap-2 ">
                            <img class="rounded-circle" src="${news.author.img}" alt="" width="35" height="35">

                            <p class="card-text"><small class="text-muted fs-6">${news.author.name ? news.author.name : 'No Name Available'}</small>
                            </p>
                        </div>

                        <div class="d-flex gap-2">
                            <i class="fa-solid fa-user"></i>
                            <p>${news.total_view ? news.total_view : 'No View'}</p>
                        </div>

                        <div>
                            <button onclick="newsDetails('${news._id}')" class="btn btn-outline-none text-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i
                                    class="fa-solid fa-arrow-right" ></i></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>  
        `;
        // console.log(news._id);
        newsConatiner.appendChild(newsDiv);
    })
}

const newsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = news => {
    // console.log(news);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = news.title;

    const modalImg = document.getElementById('news-details');
    modalImg.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="modal-img img-fluid" src="${news.image_url}" alt="">
    <p class="card-text m-3">${news.details}</p>
    <div class="d-flex justify-content-between mt-5">
                        <div class="d-flex gap-2 ">
                            <img class="rounded-circle" src="${news.author.img}" alt="" width="35" height="35">

                            <p class="card-text"><small class="text-muted fs-6">${news.author.name ? news.author.name : 'No Name Available'}</small>
                            </p>
                        </div>

                        <div class="d-flex gap-2">
                            <i class="fa-solid fa-user"></i>
                            <p>${news.total_view ? news.total_view : 'No View'}</p>
                        </div>

                        <div class="d-flex gap-2">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
     </div>
    
    `;
    modalImg.appendChild(div);

}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

loadNews('08');

