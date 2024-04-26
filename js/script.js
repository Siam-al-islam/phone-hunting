const loadPhoneData = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllBtn = document.getElementById('showAll');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 11);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p></p>
            <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src= "${phone.image}" >
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <p class="py-4"><span>Storage: ${phone?.mainFeatures?.storage}</span></p>
        <p class="py-4"><span>Chip Set: ${phone?.mainFeatures?.chipSet}</span></p>
        <p class="py-4"><span>Memory: ${phone?.mainFeatures?.memory}</span></p>
        <p class="py-4"><span>Sensor: ${phone?.releaseDate}</span></p>
        <p class="py-4"><span>Display Size: ${phone?.mainFeatures?.displaySize}</span></p>
    `
}

const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    toggleLoadingSpinner(true)
    const searchText = searchField.value;
    loadPhoneData(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true)
}