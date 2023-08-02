// Array of users and their randomly selected sports with specific types
const users = [
    { username: 'James', selectedSport: getRandomSport('Sprint') },
    { username: 'Kevin', selectedSport: getRandomSport('Hurdles') },
    { username: 'Dale', selectedSport: getRandomSport('High Jump') },
    { username: 'Mark', selectedSport: getRandomSport('Long Jump') },
    { username: 'Willow', selectedSport: getRandomSport('Sprint') },
    { username: 'Window', selectedSport: getRandomSport('Hurdles') },
    { username: 'Peter', selectedSport: getRandomSport('High Jump') },
    { username: 'Dominic', selectedSport: getRandomSport('Long Jump') },
    { username: 'William', selectedSport: getRandomSport('Sprint') }
  ];
  
  // Function to get a random sport with a specific type from the available sports list
  function getRandomSport(sportType) { // Function to get a random sport with a specific type from the available sports list
    const sportsOptions = { // Object of sports with specific types
      Sprint: ['60 Meters', '100 Meters', '200 Meters', 'Baton 200 Meters'],
      Hurdles: ['110 meters hurdles', '400 meters hurdles', '60 meters hurdles (indoor)', '300 meters hurdles'],
      'Long Jump': ['Junior Long Jump', 'Masters Long Jump', 'Triple Jump', 'Standing'],
      'High Jump': ['Scissors Jump (or Straight Jump)', 'Straddle Jump', 'Rolls', 'Reverse Fosbury Flop']
    };
  
    const randomIndex = Math.floor(Math.random() * sportsOptions[sportType].length); // Get a random index from the sports list
    return sportsOptions[sportType][randomIndex]; // Return the random sport
  }
  
  function displaySelectedUserSports(selectedUser) { // Function to display the selected user's sports
    const userSection = document.getElementById('userSection');
    if (userSection) {
      userSection.innerHTML = ''; // Clear the existing content
  
      // Create the subsection for the selected user
      const userSubSection = document.createElement('div'); 
      userSubSection.classList.add('user-subsection'); // Add a class to the subsection
      userSubSection.innerHTML = `
        <h2>${selectedUser}'s Sport</h2>
        <ul class="sports-list">
          <li>${users.find((u) => u.username === selectedUser).selectedSport}</li> 
        </ul>
      `;
  
      userSection.appendChild(userSubSection); // Append the subsection to the user section
    }
  }
  
  function showUserSection() { // Function to show the user section
    const ageBracketSelect = document.getElementById('ageBracket'); // Get the age bracket select element
    const selectedUser = ageBracketSelect.value;
  
    const userSection = document.getElementById('userSection'); // Get the user section element
    if (userSection) {
      if (selectedUser !== 'default') { // If the selected user is not the default option
        userSection.style.display = 'block'; // Display the user section
        displaySelectedUserSports(selectedUser); // Display the selected user's sports
      } else { // If the selected user is the default option
        userSection.style.display = 'none'; // Hide the user section
      }
    }
  }
  
  window.addEventListener('load', () => { // Add an event listener to the window object
    const ageBracketSelect = document.getElementById('ageBracket'); // Get the age bracket select element
    if (ageBracketSelect) { // If the age bracket select element exists
      ageBracketSelect.addEventListener('change', showUserSection); // Add an event listener to the age bracket select element
    }
  });
  
  // Function to navigate back to the previous page
function goBack() { // Function to navigate back to the previous page
  window.history.back(); // Go back to the previous page
}

// Event listener for the goBackButton
const goBackButton = document.getElementById('goBackButton'); // Get the goBackButton element
if (goBackButton) { // If the goBackButton element exists
  goBackButton.addEventListener('click', goBack); // Add an event listener to the goBackButton element
}