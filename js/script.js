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