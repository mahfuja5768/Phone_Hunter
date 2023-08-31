const loadAllNews = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  //   console.log(data);
  const allNews = data.data.news_category; /* .slice(0, 4) */
  loadCategoriesName(allNews);
};

function loadCategoriesName(allNews) {
  //   console.log(allNews);
  const news_categories = document.getElementById("news_categories");
  allNews.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<p onclick="handleCategoryId('${category.category_id}'); handleCategoryName('${category.category_name}')"> ${category.category_name} </p>`;
    news_categories.appendChild(div);
  });
}

const handleCategoryName = (categoryName) => {
  const category_name = document.getElementById("category_name");
  category_name.innerText = categoryName;
};

const handleCategoryId = async (categoryId) => {
  // console.log(categoryId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const categoryNewsAll = data.data;
  displayNews(categoryNewsAll);
};

const displayNews = (categoryNewsAll) => {
  const news_counter = document.getElementById("news_counter");
  const news_container = document.getElementById("news_container");
  news_container.textContent = "";
  const totalNews = categoryNewsAll.length;
  //   console.log(totalNews);
  news_counter.innerText = totalNews;

  if(totalNews !== 0){
     categoryNewsAll.forEach((categoryNews) => {
      //  console.log(categoryNews);
       const div = document.createElement("div");
       div.innerHTML = `
       <div class="card flex p-4 card-side bg-base-100 shadow-xl">
       <figure>
         <img
           src="${categoryNews.thumbnail_url}"
           alt="Movie" class="flex-1"
         />
       </figure>
       <div class="card-body w-1/2">
   
         <h4 class="card-title text-2xl font-bold">${categoryNews.title}</h4>
         <p class="card-text">${categoryNews.details.slice(0, 400)}</p>
   
   <div class="flex justify-between">
   <div class="flex">
    <div><img src="${
      categoryNews.author.img ? categoryNews.author?.img : "no image available"
    }" alt="" style="width:50px; height:50px; border-radius : 50%"></div>
     <div class="ps-2">
      <p class="text-lg font-bold">${
        categoryNews.author.name
          ? categoryNews.author.name
          : "No author name available"
      } <br>
       <small>${categoryNews.author.published_date}</small> </p>
     </div>
     </div>
     <div class="text-lg font-bold">Viewes : ${
       categoryNews.total_view ? categoryNews.total_view : "Not available"
     }</div>
     <div class="text-lg font-bold">Rating : ${
       categoryNews.rating.number ? categoryNews.rating.number : "Not available"
     }</div>
     <div>
     <button class="btn btn-outline" onclick="loadNewsDetails('${
       categoryNews._id
     }')">Show more</button></div>
    </div>
    </div>
   
       
       </div>
       `;
       news_container.appendChild(div);
     });
  }
  else{
   news_container.innerHTML = `<h1 class="text-3xl font-semibold text-center text-red-600">Sorry! no news available</h1>`
  }
};



const loadNewsDetails =async(news_id)=>{
  const res = await fetch (`https://openapi.programming-hero.com/api/news/${news_id}`);
  const data = await res.json();
  // console.log(data.data[0]);
  const newsDetails = data.data[0];
  displayDetails(newsDetails);
}

const displayDetails =(newsDetails)=>{
  
}

handleCategoryId("04");

loadAllNews();
