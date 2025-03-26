document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const continentsContainer = document.getElementById('continents-container');
    const destinationsContainer = document.getElementById('destinations-container');
    const destinationsSection = document.getElementById('destinations-section');
    const continentTitle = document.getElementById('continent-title');
    const backButton = document.getElementById('back-button');

    // Fetch data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Load continents
            loadContinents(data.continents);
            
            // Back button event listener
            backButton.addEventListener('click', function() {
                destinationsSection.classList.add('hidden');
                document.querySelector('.continent-selection').classList.remove('hidden');
            });
        })
        .catch(error => console.error('Error loading data:', error));

        // Load continents function
    function loadContinents(continents) {
        continentsContainer.innerHTML = '';
        
        continents.forEach(continent => {
            const continentCard = document.createElement('div');
            continentCard.className = 'continent-card';
            
            continentCard.innerHTML = `
                <img src="${continent.image}" alt="${continent.name}" class="continent-image">
                <div class="continent-info">
                    <h3>${continent.name}</h3>
                    <p>${continent.description}</p>
                </div>
            `;
            
            continentCard.addEventListener('click', function() {
                showDestinations(continent);
            });
            
            continentsContainer.appendChild(continentCard);
        });
    }