let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
};

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');
};

 // Fetch booking data from the server
 fetch('/bookingdata')
 .then(response => response.json())
 .then(data => {
   // Handle the fetched data and update the HTML content
   const bookingData = data.bookingData;
   const upcomingBookings = document.getElementById('upcomingTripsList');
   const recentBookings = document.getElementById('recentBookingsList');
   const currentDate = new Date();
  

   if (bookingData && bookingData.length > 0) {
     bookingData.forEach(booking => {
       const listItem = document.createElement('li');
       listItem.innerHTML = `
         <p>Name: ${booking.name}</p>
         <p>Email: ${booking.email}</p>
         <p>Phone: ${booking.phone}</p>
         <p>Address: ${booking.address}</p>
         <p>Location: ${booking.location}</p>
         <p>Arrival: ${booking.arrival}</p>
         <p>Departure: ${booking.departure}</p>
         <!-- Display other booking data as needed -->
       `;
       // Check if the booking date is past the current date
       if (new Date(booking.arrival) < currentDate) {
        recentBookings.appendChild(listItem);
      } else {
        upcomingBookings.appendChild(listItem);
      }
      //  bookingList.appendChild(listItem);
     });
   } else {
     const listItem = document.createElement('li');
     listItem.textContent = 'No booking data found.';
     upcomingBookings.appendChild(listItem);
     upcomingBookings.appendChild(listItem);
     recentBookings.appendChild(listItem.cloneNode(true));
   }
 })
 .catch(error => console.error('Error fetching data:', error));

// Close the sign-up modal when the close button is clicked
document.getElementById("close-button").addEventListener("click", function() {
  document.getElementById("signup-modal").style.display = "none";
});


// Function to show the login modal
function openModal() {
 const loginModal = document.getElementById("login-modal");
 loginModal.style.display = "block";
}

// Function to close the login modal
function closeModal() {
 const loginModal = document.getElementById("login-modal");
 loginModal.style.display = "none";
}

// Add event listeners for the login modal
document.getElementById('loginButton').addEventListener('click', openModal);
document.getElementById('loginclose-button').addEventListener('click', closeModal);

// logoutModal
const logoutModalz = document.getElementById('logoutModal');
const closeModalz = document.getElementById('closelogoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

// Function to show the logout modal
function showLogoutModal() {
 logoutModalz.style.display = 'block';
}

// Function to close the logout modal
function closeLogoutModal() {
  logoutModalz.style.display = 'none';
}

// Event listener for the close button in the modal
closeModalz.addEventListener('click', closeLogoutModal);

// Event listener for the "Log Out" button in the modal
confirmLogout.addEventListener('click', () => {
  // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
 console.log('Logging out...'); // Replace with actual logout code

  // Close the modal after logout
  closeLogoutModal();
});

//  declared outside to ease the errors
const fetchProfileImage = async () => {
  try {
    // Fetch the profile image URL from the server
    const response = await fetch('/profile-image');
    const responseData = await response.json();

    if (response.ok) {
      const imageUrl = responseData.user;
      // const imageData = responseData.url; // Assuming the server sends JSON data with the image URL
      return imageUrl; // Return the fetched image data
    } else if (response.status === 401) {
      return null; // User is not logged in, return null for no image data
    } else {
      throw new Error('Failed to fetch profile image URL');
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}
// Define the UIHandler object outside the DOMContentLoaded event listener
const UIHandler = {
  showLoggedInUI: async function() {
    try {
      // Update the UI to show elements for logged-in users
      const signupButton = document.getElementById('signupButton');
      const loginButton = document.getElementById('loginButton');
      const profileSettings = document.getElementById('profileSettings');

      signupButton.style.display = 'none';
      loginButton.style.display = 'none';
      profileSettings.style.display = 'block';

      // Call fetchProfileImage to get the image data
      const imageData = await fetchProfileImage();

      // Get the image element
      const profileImageElement = document.getElementById('profile-image');

      if (imageData) {

        // Display the profile settings with the fetched image data
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${imageData}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;

        // Add event listener to toggle dropdown menu
        document.addEventListener("click", function (event) {
          const dropdown = document.querySelector(".dropdown-menu");
          const profileDropdown = document.getElementById("profile-dropdown");
          if (!profileDropdown.contains(event.target)) {
            dropdown.style.display = "none";
          }
        });

        document.getElementById("profile-dropdown").addEventListener("click", function () {
          const dropdown = document.querySelector(".dropdown-menu");
          dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });
              // Open the sign-up modal when the sign-up button is clicked
      document.getElementById("logoutButton").addEventListener("click", function() {
        document.getElementById("logoutModal").style.display = "block";
      });

      // Event listener for showing the logoutModal
      logoutModalz.addEventListener('click', showLogoutModal);

       // Event listener for the close button in the modal
      closeModalz.addEventListener('click', closeLogoutModal);

      // Event listener for the "Log Out" button in the modal
      confirmLogout.addEventListener('click', () => {
        // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
      console.log('Logging out...');

        // Close the modal after logout
        closeLogoutModal();
      });
      
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      // Handle the error or set a default image
      // // Get the image element
      const defaultImagePath = 'https://i.imgur.com/r79g1jQ.jpg'; // Replace with the correct default image path
      const profileSettings = document.getElementById('profileSettings');
      console.log(defaultImagePath)
    
        // Display the profile settings with the fetched image data
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${defaultImagePath}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;

        // Add event listener to toggle dropdown menu
        document.addEventListener("click", function (event) {
          const dropdown = document.querySelector(".dropdown-menu");
          const profileDropdown = document.getElementById("profile-dropdown");
          if (!profileDropdown.contains(event.target)) {
            dropdown.style.display = "none";
          }
        });

        document.getElementById("profile-dropdown").addEventListener("click", function () {
          const dropdown = document.querySelector(".dropdown-menu");
          dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });
              // Open the sign-up modal when the sign-up button is clicked
      document.getElementById("logoutButton").addEventListener("click", function() {
        document.getElementById("logoutModal").style.display = "block";
      });

      
   
      // Event listener for showing the logoutModal
      logoutModalz.addEventListener('click', showLogoutModal);

       // Event listener for the close button in the modal
      closeModalz.addEventListener('click', closeLogoutModal);

      // Event listener for the "Log Out" button in the modal
      confirmLogout.addEventListener('click', () => {
        // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
      console.log('Logging out...');

        // Close the modal after logout
        closeLogoutModal();
      });
      
    }
  }
};



// CheckLogIn Status
async function checkLoginStatus() {
 try {
   const response = await fetch('/api/login-status');
   const data = await response.json();

   // data.isLoggedIn will be true if the user is logged in
   if (data.isLoggedIn) {

     UIHandler.showLoggedInUI(); // Call the showLoggedInUI function through the UIHandler object
   } else {
     
     showNonLoggedInUI();
   }
 } catch (error) {
   console.error('Error fetching login status:', error);
 }
}

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

// if the user is logged out
function showNonLoggedInUI() {
 // Update the UI to show elements for non-logged-in users
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const profileSettings = document.getElementById('profileSettings');
 
  profileSettings.style.display = 'none';
  signupButton.style.display = 'block';
  loginButton.style.display = 'block';
 document.getElementById('loginForm').style.display = 'block';

}



