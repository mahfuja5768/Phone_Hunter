function loadPhones(searchText, isShowAll) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      const phonesData = data.data;
      displayPhones(phonesData, isShowAll);
    });
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone_container");

  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show_all_container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }
  // console.log(isShowAll, "is show all");

  phones.forEach((phone) => {
    console.log(phone);
    const phoneItem = document.createElement("div");
    phoneItem.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure class="mx-5 mt-5 bg-blue-100 rounded-xl">
          <img src=${phone.image} alt="Shoes" class="rounded-xl m-10" />
        </figure>
        <div class="card-body items-center text-center space-y-3">
          <h2 class="text-2xl font-bold">${phone.phone_name}</h2>
          <p class="w-3/4 ">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary my-3 rounded-lg bg-blue-600 text-white border-none hover:bg-blue-800">Show Details</button>
          </div>
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneItem);
  });
  loader(false);
};


const handleShowDetails = async (id) => {
  loader(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const details = data.data;
  phoneDetails(details);
};

function phoneDetails(phone) {
  console.log(phone);
  phnDetails.showModal();
  const modal = document.getElementById("modal_body");
  modal.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card">
  <figure class=" bg-blue-100 rounded-xl">
    <img src=${phone.image} alt="Shoes" class="rounded-xl my-10" />
  </figure>
  <div class="card-body text-start">
    <h2 class="text-xl font-bold ">${phone.name}</h2>
    <p class='w-full text-sm'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
     </p>
     <p><span class="font-semibold text-lg">Storage: </span>${phone?.mainFeatures?.storage}</p>
     <p><span class="font-semibold text-lg">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
     <p><span class="font-semibold text-lg">Release Date: </span>${phone?.releaseDate}</p>
     <p><span class="font-semibold text-lg">Slug: </span>${phone?.slug}</p>
    </div>
</div>
  `;
  modal.appendChild(div);
  loader(false)
}

const loader = (isLoading) => {
  const loading = document.getElementById("loader");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

const searchField = document.getElementById("search_field");
const handleSearch = (isShowAll) => {
  loader(true);
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
  searchField.value = "";
};

// loadPhones("12");
