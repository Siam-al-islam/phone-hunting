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
    // console.log(phones.length)
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button onclick="" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}



const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    toggleLoadingSpinner(true)
    const searchText = searchField.value;
    loadPhoneData(searchText, isShowAll);
    // toggleLoadingSpinner(false)
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