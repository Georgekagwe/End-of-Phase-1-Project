document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const continentsContainer = document.getElementById('continents-container');
    const destinationsContainer = document.getElementById('destinations-container');
    const destinationsSection = document.getElementById('destinations-section');
    const continentTitle = document.getElementById('continent-title');
    const backButton = document.getElementById('back-button');

    // Data fetched from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Load continents
            loadContinents(data.continents);
            
            // Back button event to go back to contnents
            backButton.addEventListener('click', function() {
                goBackToContinents();
            });

             // "Escape" key to go go back to continents
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    goBackToContinents();
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));

    // Function to load continents
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

    // Showing destinations for selected continent
    function showDestinations(continent) {
        document.querySelector('.continent-selection').classList.add('hidden');
        destinationsSection.classList.remove('hidden');
        
        continentTitle.querySelector('span').textContent = continent.name;
        destinationsContainer.innerHTML = '';
        
        // Display top 2 destinations
        continent.topDestinations.slice(0, 2).forEach(destination => {
            const destinationCard = document.createElement('div');
            destinationCard.className = 'destination-card';
            
            destinationCard.innerHTML = `
                <img src="${destination.image}" alt="${destination.name}" class="destination-image">
                <div class="destination-info">
                    <h3>${destination.name}</h3>
                    <p>${destination.description}</p>
                    <div class="destination-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${destination.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            destinationsContainer.appendChild(destinationCard);
        });
    }

    // Function to go back to continent selection
    function goBackToContinents() {
        destinationsSection.classList.add('hidden');
        document.querySelector('.continent-selection').classList.remove('hidden');
    }
});
