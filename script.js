// i made comments for pratically everything to make it easier to follow along lol

"use strict";
// Array of user data (the entries for the username)
const users = [
 { username: 'James', password: '123', selectedSport: null },
  { username: 'Kevin', password: '123', selectedSport: null },
  { username: 'Dale', password: '123', selectedSport: null },
  { username: 'Mark', password: '123', selectedSport: null },
  { username: 'admin', password: 'admin', selectedSport: null },
  { username: 'Willow', password: '123', selectedSport: null },
  { username: 'Charli', password: '123', selectedSport: null },
  { username: 'Peter', password: '123', selectedSport: null },
  { username: 'Dominic', password: '123', selectedSport: null },
  { username: 'William', password: '123', selectedSport: null }
];

// Function to display the available options for a selected sport
function displaySportOptions(sport) {
  const loggedInUsername = getLoggedInUsername().toLowerCase(); // Get the logged-in username
  const sportOptionsContainer = document.getElementById('sportOptionsContainer'); // Get the sport options container


// If the logged-in user is an admin, clear the sport options container
if (loggedInUsername === 'admin' && sportOptionsContainer) {
  sportOptionsContainer.innerHTML = '';
  return;
}

  if (sportOptionsContainer) { // If the sport options container exists
    const optionsList = document.createElement('ul'); // Create a list to hold the options
    sportsOptions[selectedSport].forEach((option) => { // Loop through the options for the selected sport
      const listItem = document.createElement('li');
      listItem.textContent = option;
      optionsList.appendChild(listItem);
    });

    // To Replace existing options with the new ones
    const existingOptionsList = sportOptionsContainer.querySelector('ul'); // Get the existing options list
    if (existingOptionsList) {
      sportOptionsContainer.replaceChild(optionsList, existingOptionsList);
    } else {
      sportOptionsContainer.appendChild(optionsList);
    }
  }
}

// Function to display the selected option for the logged-in user
function displaySelectedSportOptions() {
  const sportOptionsSelect = document.getElementById('sportOptionsSelect'); // Get the sport options select element
  if (sportOptionsSelect) {
    const selectedSport = sportOptionsSelect.value;
    displaySportOptions(selectedSport); // Display the options for the selected sport
  }
}

const sportsOptions = {
  Sprint: ['100 Meter Sprint', '200 Meter Sprint', '400 Meter Sprint'],
  Hurdles: ['110 Meters ', '300 Meters', '400 Meters'],
};

// Function to populate the dropdown with options for the selected sport
function populateSportOptionsDropdown(sport) { // sport is the selected sport
  const sportOptionsSelect = document.getElementById('sportOptionsSelect'); // Get the sport options select
  if (sportOptionsSelect) { // If the sport options select exists
    sportOptionsSelect.innerHTML = '';
    sportsOptions[sport].forEach((option) => {
      const optionItem = document.createElement('option'); // Create an option
      optionItem.textContent = option; // Set the text content of the option to the option value
      sportOptionsSelect.appendChild(optionItem); // Add the option to the select
    });
  }
}

window.addEventListener('load', () => { // When the page loads
  initializePage(); // Initialize the page
  initializeProfilePage(); // Initialize the profile page
  updateTimeDate(); // Update the time and date

const sportListItems = document.querySelectorAll('#sportList li'); // Get the list of sport list items
sportListItems.forEach((item) => {
  item.addEventListener('click', () => {
    selectEvent(item.textContent); // Update the selected sport
    if (!isAdmin) { // Update the dropdown options for non-admin users 
      populateSportOptionsDropdown(item.textContent); // Update the dropdown options for non-admin users
    }
  });
});

  // Initialize the sport options dropdown with the first sport in the list
  const firstSport = sportListItems[0].textContent;
  populateSportOptionsDropdown(firstSport);
});



function validateForm(event) { // Function to validate the login form
  event.preventDefault();
  const username = document.getElementById('username').value; // Get the username from the form
  const password = document.getElementById('password').value; // Get the password from the form

  const user = users.find((user) => user.username === username && user.password === password); // Find the user with the matching username and password

  if (user) {
    localStorage.setItem('selectedSport_' + username, user.selectedSport); // Store the selected sport for the user
    localStorage.setItem('username', username);// Store the username in local storage
    window.location.href = 'loginsuccess.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

// Function to get the username of the logged-in user from local storage
function getLoggedInUsername() {
  return localStorage.getItem('username');
}

// Function to display the username of the logged-in user
function displayLoggedInUsername() {
  const username = getLoggedInUsername();
  const usernameElement = document.getElementById('username');
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}

// Function to display the selected sport as the active event
function displaySelectedSport() {
  const selectedSport = getSelectedSport();
  const sportListItems = document.querySelectorAll('#sportList li');
  sportListItems.forEach((item) => {
    item.classList.toggle('selected-event', item.textContent === selectedSport);
  });

  const loggedInUsername = getLoggedInUsername().toLowerCase();
  const isAdmin = loggedInUsername === 'admin';

  if (!isAdmin) {
    populateSportOptionsDropdown(selectedSport); // Update the dropdown options for non-admin users
  }
}

// Function to get the selected sport for the logged-in user from local storage
function getSelectedSport() {
  const username = getLoggedInUsername();
  return localStorage.getItem('selectedSport_' + username);
}

// Function to set the selected sport and option for the logged-in user in local storage
function setSelectedSport(sport, option) {
  const username = getLoggedInUsername();
  localStorage.setItem('selectedSport_' + username, sport);
  localStorage.setItem('selectedOption_' + username, option); // Store the selected option for the user
}

// Function to handle the event when a sport is selected by the user
function selectEvent(sport) {
  setSelectedSport(sport);
  displaySelectedSport();

  if (getLoggedInUsername() !== 'admin') {
    populateSportOptionsDropdown(sport); // Update the dropdown options

    // Save the selected option for the logged-in user
    const sportOptionsSelect = document.getElementById('sportOptionsSelect');
    if (sportOptionsSelect) {
      const selectedOption = sportOptionsSelect.value;
      setSelectedOption(getLoggedInUsername(), selectedOption);
    }
  }
}

// Function to populate the list of selected sports for non-admin users
function populateSelectedSportsList() { // Function to populate the list of selected sports for non-admin users
  const selectedSportsList = document.getElementById('selectedSportsList'); // Get the selected sports list
  if (selectedSportsList) {
    selectedSportsList.innerHTML = '';
    users.forEach((user) => {
      const selectedSport = localStorage.getItem('selectedSport_' + user.username); // Get the selected sport for the user
      if (selectedSport) {
        const listItem = document.createElement('li'); // Create a list item
        listItem.textContent = user.username + ': ' + selectedSport; // Set the text content of the list item to the username and selected sport
        listItem.setAttribute('data-username', user.username);

        if (getLoggedInUsername() === 'admin') {
          listItem.addEventListener('click', (event) => {
            const username = event.target.getAttribute('data-username'); // Get the username from the list item
            const dob = localStorage.getItem('dob_' + username.toLowerCase()); // Get the date of birth for the user
            const grade = localStorage.getItem('grade_' + username.toLowerCase()); // Get the grade for the user

            if (dob && grade) { // this is a bit formatted weird, let me explain: the date of birth is also checked when the sport is saved and when you click it, it also validates. 
              alert('Username: ' + username + '\nDate of Birth: ' + dob + '\nGrade: ' + grade); // Display the username, date of birth, and grade for the user
            } else {
              alert('This event has now been approved!'); // Display a message to indicate that the event has been approved
            }
          });
        }

        selectedSportsList.appendChild(listItem);
      }
    });
  }
}

// Function to set the selected option for a specific user in local storage
function setSelectedOption(username, option) {
  localStorage.setItem('selectedOption_' + username, option);
}

// Function to update the list of selected sports in the admin section
function updateAdminSelectedSportsList() {
  const selectedSportsList = document.getElementById('selectedSportsList');
  if (selectedSportsList) {
    selectedSportsList.innerHTML = '';

    users.forEach((user) => {
      const selectedSport = localStorage.getItem('selectedSport_' + user.username);
      const selectedOption = localStorage.getItem('selectedOption_' + user.username);

      if (selectedSport && selectedOption) {
        const listItem = document.createElement('li');
        listItem.textContent = user.username + ': ' + selectedSport + ' - ' + selectedOption;
        listItem.setAttribute('data-username', user.username);
        listItem.addEventListener('click', onItemClick);
        selectedSportsList.appendChild(listItem);
      }
    });
  }
}


// Function to initialize the page and display relevant content for the logged-in user
function initializePage() { // Function to initialize the page
  displayLoggedInUsername(); // Display the username of the logged-in user
  displaySelectedSport(); // Display the selected sport for the logged-in user
  populateSelectedSportsList(); // Populate the list of selected sports for non-admin users

  
  // Remove the "Go to Admin Page" button
  const adminButton = document.getElementById('goToAdminPageButton');
  if (adminButton) {
    adminButton.style.display = 'none';
  }

  // Remove the "Clear" button
  const clearSelectedSportButton = document.getElementById('clearSelectedSportButton');
  if (clearSelectedSportButton) {
    clearSelectedSportButton.style.display = 'none';
  }
  
  const loggedInUsername = getLoggedInUsername().toLowerCase(); // Get the username of the logged-in user
  const isAdmin = loggedInUsername === 'admin'; // Check if the logged-in user is an admin
  const adminSection = document.getElementById('adminSection'); // Get the admin section
  const sportListSection = document.getElementById('sportListSection'); // Get the sport list section
  
  if (adminButton) {
    adminButton.style.display = isAdmin ? 'block' : 'none';
  }

  if (clearSelectedSportButton) {
    clearSelectedSportButton.style.display = isAdmin ? 'block' : 'none';
  }

  if (adminSection) { // Display the admin section for admin users
    adminSection.style.display = isAdmin ? 'block' : 'none'; 
  }

  if (sportListSection) { 
    sportListSection.style.display = isAdmin ? 'none' : 'block'; // Display the sport list section for non-admin users
  }


  const sportListItems = document.querySelectorAll('#sportList li'); // Get the list of sport list items
  sportListItems.forEach((item) => {
    item.addEventListener('click', () => {
      selectEvent(item.textContent); // Update the selected sport
      if (!isAdmin) { // Update the dropdown options for non-admin users 
        populateSportOptionsDropdown(item.textContent); // Update the dropdown options for non-admin users
      }
    });
  });

  if (!isAdmin && sportOptionsContainer) { // Display the dropdown options for non-admin users
    const sportListItems = document.querySelectorAll('#sportList li'); // Get the list of sport list items
    const firstSport = sportListItems[0].textContent; // Get the first sport in the list
    populateSportOptionsDropdown(firstSport); // Populate the dropdown options for the first sport in the list
  } else if (sportOptionsContainer) {  // Hide the dropdown options for admin users
    sportOptionsContainer.innerHTML = ''; // Clear the dropdown options
  }
}

function hideAdminWelcomeText() {
  const loggedInUsername = getLoggedInUsername().toLowerCase(); // Get the username of the logged-in user
  const isAdmin = loggedInUsername === 'admin'; // Check if the logged-in user is an admin
  const adminWelcomeText = document.getElementById('adminWelcomeText'); // Get the admin welcome text element

  if (isAdmin && adminWelcomeText) {
    adminWelcomeText.style.display = 'none'; // Hide the welcome text for admin users
  }
}

window.addEventListener('load', () => {
  hideAdminWelcomeText(); // Hide the admin welcome text on page load
  initializePage(); // Initialize the page
  initializeProfilePage(); // Initialize the profile page
  updateTimeDate(); // Update the time and date

  // Display selected option for the logged-in user in admin section on page load
  if (getLoggedInUsername().toLowerCase() === 'admin') {
    updateAdminSelectedSportsList();
    createAdminButton();
  }

  const adminButton = document.getElementById('goToAdminPageButton'); // Change the id to "GoToAdminPageButton"
  if (adminButton){

    adminButton.addEventListener('click', () => {
      window.location.href = 'admin_page.html'; // Redirect to admin page
    });
  }

  // Add event listener for the "Clear" button
  const clearSelectedSportButton = document.getElementById('clearSelectedSportButton');
  if (clearSelectedSportButton) {
    clearSelectedSportButton.addEventListener('click', clearSelectedSport);
  }
});

function saveProfile(event) { // Function to save the user profile
  event.preventDefault(); // Prevent the default form submission behaviour
  const dob = document.getElementById('dob').value; // Get the date of birth from the form
  const grade = document.getElementById('grade').value; // Get the grade from the form
  const username = getLoggedInUsername(); // Get the logged-in username

  localStorage.setItem('dob_' + username.toLowerCase(), dob); // Store the date of birth in local storage
  localStorage.setItem('grade_' + username.toLowerCase(), grade); // Store the grade in local storage

  alert('Profile saved successfully!'); // Display an alert to the user
}

function populateProfileForm() {
  const dob = localStorage.getItem('dob_' + getLoggedInUsername().toLowerCase()); // Get the date of birth from local storage
  const grade = localStorage.getItem('grade_' + getLoggedInUsername().toLowerCase());   // Get the grade from local storage

  const dobField = document.getElementById('dob'); // Get the date of birth field
  const gradeField = document.getElementById('grade'); // Get the grade field

  if (dob && grade) { // If the date of birth and grade are available
    dobField.value = dob; // Set the date of birth field value
    gradeField.value = grade; // Set the grade field value
  }
}

// Function to display the user profile page and populate the form with saved profile data
function initializeProfilePage() {
  populateProfileForm();
}
// Initialize the user profile page when the window loads
window.addEventListener('load', initializeProfilePage);
// Function to change the profile picture by clicking on the profile picture element
function changeProfilePicture() {
  const profilePictureInput = document.getElementById('profilePictureInput');
  profilePictureInput.click();
}
// Function to display the selected profile picture
function displaySelectedProfilePicture(event) { 
  const selectedFile = event.target.files[0]; // Get the selected file from the persons files
  const profilePicture = document.getElementById('profilePicture'); // Get the profile picture element

  if (selectedFile) { 
    const reader = new FileReader();

    reader.onload = function (event) {
      profilePicture.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile); // Convert the selected file to a data URL
  }
}
// Function to display the current time and date on the page
function displayTimeDate() { // Function to display the current time and date on the page
  const timeDateElement = document.getElementById('timeDate');
  if (timeDateElement) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const timeDateStr = now.toLocaleString(undefined, options); // Get the current time and date as a string
    timeDateElement.textContent = timeDateStr;
  }
}

// Update the time and date every second
function updateTimeDate() {
  setInterval(displayTimeDate, 1000);
}

// Initialize the time and date when the window loads
window.addEventListener('load', updateTimeDate);


// Add the login form submit event listener
const loginForm = document.getElementById('loginForm'); // Get the login form
if (loginForm) { // Check if the login form is available
  loginForm.addEventListener('submit', validateForm); // Add the submit event listener
}

const saveProfileButton = document.getElementById('saveProfileButton'); // Get the save profile button
if (saveProfileButton) { // Check if the save profile button is available
  saveProfileButton.addEventListener('click', saveProfile); // Add a click event listener to the save profile button
}

function onItemClick(event) { // Function to display the user profile information when the admin clicks on a user
  const username = event.target.getAttribute('data-username'); // Get the username from the list item 
  const dob = localStorage.getItem('dob_' + username.toLowerCase()); // Get the date of birth from local storage
  const grade = localStorage.getItem('grade_' + username.toLowerCase()); // Get the grade from local storage

  if (dob && grade) { // Check if the date of birth and grade are available
    alert('Username: ' + username + '\nDate of Birth: ' + dob + '\nGrade: ' + grade); // Display the user profile information
  } else { // If the date of birth or grade is not available
    alert('This event has been now approved.'); // Display an alert to the user
  }
} 

function createAdminButton() { // Function to create the admin button
  const adminSection = document.getElementById('adminSection'); // Get the admin section element
  if (adminSection) { // Check if the admin section exists
    const button = document.createElement('button'); // Create a button element
    button.textContent = 'Go to Admin Page'; // Set the button text
    button.addEventListener('click', () => { // Add a click event listener
      window.location.href = 'admin_page.html'; // Redirect to admin page
    });

    // adminSection.appendChild(button);
  }
}

function clearSelectedSport(event) {
  const selectedSportItem = event.target.closest('li[data-username]'); // Find the closest parent <li> element with data-username attribute
  if (selectedSportItem) {
    const username = selectedSportItem.getAttribute('data-username');
    localStorage.removeItem('selectedSport_' + username);
    updateAdminSelectedSportsList();
  }
}
