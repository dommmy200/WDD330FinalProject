export function paginatedSearch() {
    const searchInput = document.getElementById('searchInput');
    const optionsList = document.getElementById('optionsList');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const optionsPerPage = 10;
    let currentPage = 1;
    let totalPages = 0;
    let filteredOptions;
    searchInput.addEventListener('input', () => {
        const optionsString = optionsList.querySelectorAll('li');
        const options = Array.from(optionsString)
        const searchTerm = searchInput.value.toLowerCase();
        filteredOptions = options.filter(option => {
            if (option.textContent.toLowerCase().includes(searchTerm)){
                return option;
            }
        });
        totalPages = Math.ceil(filteredOptions.length / optionsPerPage);
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        displayOptions(filteredOptions, currentPage);
    });
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage++;
            displayOptions(filteredOptions, currentPage);
        }
    });
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayOptions(filteredOptions, currentPage);
        }
    });
    const tempUnorderedList = document.createElement('ul');
    tempUnorderedList.setAttribute('id', 'tempUnorderedList');
    searchInput.insertAdjacentHTML('afterbegin', tempUnorderedList);
    
    // Define pagination function for optimal page loading
    function displayOptions(options, page) {
        const startIndex = (page - 1) * optionsPerPage;
        const endIndex = startIndex + optionsPerPage;
        const paginatedOptions = options.slice(startIndex, endIndex);
        tempUnorderedList.innerHTML = '';
        paginatedOptions.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option.textContent;
            tempUnorderedList.appendChild(li);
        });
    }
}