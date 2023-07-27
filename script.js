"use strict";

const users = [
 { username: 'James', password: '123', selectedSport: null },
  { username: 'Kevin', password: '123', selectedSport: null },
  { username: 'Dale', password: '123', selectedSport: null },
  { username: 'Mark', password: '123', selectedSport: null },
  { username: 'admin', password: 'admin', selectedSport: null },
  { username: 'Willow', password: '123', selectedSport: null },
  { username: 'Window', password: '123', selectedSport: null },
  { username: 'Peter', password: '123', selectedSport: null },
  { username: 'Dominic', password: '123', selectedSport: null },
  { username: 'William', password: '123', selectedSport: null }
];

function validateForm(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('selectedSport_' + username, user.selectedSport);
    localStorage.setItem('username', username);
    window.location.href = 'loginsuccess.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

function getLoggedInUsername() {
  return localStorage.getItem('username');
}

function displayLoggedInUsername() {
  const username = getLoggedInUsername();
  const usernameElement = document.getElementById('username');
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}

function displaySelectedSport() { // idk what the fuck this even does but lmao it works so idc
  const selectedSport = getSelectedSport();
  const sportListItems = document.querySelectorAll('#sportList li');
  sportListItems.forEach((item) => {
    item.classList.toggle('selected-event', item.textContent === selectedSport);
  });
}

function getSelectedSport() {
  const username = getLoggedInUsername();
  return localStorage.getItem('selectedSport_' + username);
}

function setSelectedSport(sport) {
  const username = getLoggedInUsername();
  localStorage.setItem('selectedSport_' + username, sport);
}

function selectEvent(sport) {
  setSelectedSport(sport);
  displaySelectedSport();
}

function populateSelectedSportsList() {
  const selectedSportsList = document.getElementById('selectedSportsList');
  if (selectedSportsList) {
    selectedSportsList.innerHTML = '';

    users.forEach((user) => {
      const selectedSport = localStorage.getItem('selectedSport_' + user.username);
      if (selectedSport) {
        const listItem = document.createElement('li');
        listItem.textContent = user.username + ': ' + selectedSport;
        listItem.setAttribute('data-username', user.username);

        if (getLoggedInUsername() === 'admin') {
          listItem.addEventListener('click', (event) => {
            const username = event.target.getAttribute('data-username');
            const dob = localStorage.getItem('dob_' + username.toLowerCase());
            const grade = localStorage.getItem('grade_' + username.toLowerCase());

            if (dob && grade) {
              alert('Username: ' + username + '\nDate of Birth: ' + dob + '\nGrade: ' + grade);
            } else {
              alert('Date of Birth or Grade information not available for this user.');
            }
          });
        }

        selectedSportsList.appendChild(listItem);
      }
    });
  }
}

function initializePage() {
  displayLoggedInUsername();
  displaySelectedSport();
  populateSelectedSportsList();

  const loggedInUsername = getLoggedInUsername().toLowerCase();
  const isAdmin = loggedInUsername === 'admin';
  const adminSection = document.getElementById('adminSection');
  const sportListSection = document.getElementById('sportListSection');
  const sportListItems = document.querySelectorAll('#sportList li');

  if (adminSection) {
    adminSection.style.display = isAdmin ? 'block' : 'none';
  }

  if (sportListSection) {
    sportListSection.style.display = isAdmin ? 'none' : 'block';
  }

  if (isAdmin) {
    sportListItems.forEach((item) => {
      item.style.display = 'none';
    });
  }
}

window.addEventListener('load', initializePage);

function saveProfile(event) {
  event.preventDefault();
  const dob = document.getElementById('dob').value;
  const grade = document.getElementById('grade').value;
  const username = getLoggedInUsername();

  localStorage.setItem('dob_' + username.toLowerCase(), dob);
  localStorage.setItem('grade_' + username.toLowerCase(), grade);

  alert('Profile saved successfully!');
}

function populateProfileForm() {
  const dob = localStorage.getItem('dob_' + getLoggedInUsername().toLowerCase());
  const grade = localStorage.getItem('grade_' + getLoggedInUsername().toLowerCase());

  const dobField = document.getElementById('dob');
  const gradeField = document.getElementById('grade');

  if (dob && grade) {
    dobField.value = dob;
    gradeField.value = grade;
  }
}

function initializeProfilePage() {
  populateProfileForm();
}

window.addEventListener('load', initializeProfilePage);

function changeProfilePicture() {
  const profilePictureInput = document.getElementById('profilePictureInput');
  profilePictureInput.click();
}

function displaySelectedProfilePicture(event) {
  const selectedFile = event.target.files[0];
  const profilePicture = document.getElementById('profilePicture');

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      profilePicture.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
  }
}

function displayTimeDate() {
  const timeDateElement = document.getElementById('timeDate');
  if (timeDateElement) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const timeDateStr = now.toLocaleString(undefined, options);
    timeDateElement.textContent = timeDateStr;
  }
}

function updateTimeDate() {
  setInterval(displayTimeDate, 1000);
}

window.addEventListener('load', updateTimeDate);

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', validateForm);
}

const saveProfileButton = document.getElementById('saveProfileButton');
if (saveProfileButton) {
  saveProfileButton.addEventListener('click', saveProfile);
}
