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
     // Show destinations for selected continent
     function showDestinations(continent) {
        document.querySelector('.continent-selection').classList.add('hidden');
        destinationsSection.classList.remove('hidden');
        
        continentTitle.querySelector('span').textContent = continent.name;
        destinationsContainer.innerHTML = '';
        
        // Display top 2 destinations (changed from 5)
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
});