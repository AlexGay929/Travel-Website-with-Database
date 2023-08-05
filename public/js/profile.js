
// Open the sign-up modal when the sign-up button is clicked
document.getElementById("signupButton").addEventListener("click", function() {
  document.getElementById("signup-modal").style.display = "block";
});

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

// Functions for the logoutModal
const logoutModalz = document.getElementById('logoutModal');
const closeModalz = document.getElementById('logoutModal');
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

 console.log('Logging out...'); 

  // Close the modal after logout
  closeLogoutModal();
});

// declared outside to ease the errors
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
      // Remove the "Register" and "Log In" button
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

        // Set the image source in my Profile with the fetched image URL
        profileImageElement.src = imageData;

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

            // Attach click event listener to the "Edit Account" button
      const editAccountBtn = document.getElementById('editAccountbtn');
      editAccountBtn.addEventListener('click', () => {
        console.log('Edit Account button clicked!');
        // Enable the form elements when the button is clicked
        const fullNameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const uploadBtn = document.getElementById('upload-btn');
        const updateAccountBtn = document.getElementById('updateAccountbtn');
        const imageInput = document.getElementById('image-input');

        imageInput.disabled = false;
        fullNameInput.disabled = false;
        emailInput.disabled = false;
        passwordInput.disabled = false;
        uploadBtn.disabled = false;
        updateAccountBtn.disabled = false;
        editAccountBtn.disabled = true;

        // Remove hover effect for disabled buttons
        editAccountBtn.classList.add('no-hover');
        uploadBtn.classList.remove('no-hover');
        updateAccountBtn.classList.remove('no-hover');
      });

      // Attach click event listener to the "Update Account" button
      const updateAccountBtn = document.getElementById('updateAccountbtn');
      updateAccountBtn.addEventListener('click', () => {
        updateAccount(); // Call the updateAccount function when the button is clicked

        // Disable form elements except the "Edit Account" button
        const uploadBtn = document.getElementById('upload-btn');
        const fullNameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const editAccountBtn = document.getElementById('editAccountbtn');
        const imageInput = document.getElementById('image-input');

        fullNameInput.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;
        uploadBtn.disabled = true;
        updateAccountBtn.disabled = true;
        editAccountBtn.disabled = false;
        imageInput.disabled = true;

        // Remove hover effect for disabled buttons
        editAccountBtn.classList.remove('no-hover');
        uploadBtn.classList.add('no-hover');
        updateAccountBtn.classList.add('no-hover');
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
      const profileImageElement = document.getElementById('profile-image');
      const imgurImageUrl = 'https://i.imgur.com/r79g1jQ.jpg'; // Replace with the correct default image path
      profileImageElement.src = imgurImageUrl;
    }
  }
};

// CHECK LOG IN STATUS
async function checkLoginStatus() {
  try {
    const response = await fetch('/api/login-status');
    const data = await response.json();

    // data.isLoggedIn will be true if the user is logged in
    // Update the UI based on the login status
    if (data.isLoggedIn) {
      // Show a logged-in user interface
      UIHandler.showLoggedInUI(); // Call the showLoggedInUI function through the UIHandler object
      setFormElementsStatus(data.user);
    } else {
      // Show a non-logged-in user interface
      showNonLoggedInUI();
    }
  } catch (error) {
    console.error('Error fetching login status:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});


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

// function to disable and enable elements
function setFormElementsStatus(user) {
  const uploadBtn = document.getElementById('upload-btn');
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const editAccountBtn = document.getElementById('editAccountbtn');
  const updateAccountBtn = document.getElementById('updateAccountbtn');
  const imageInput = document.getElementById('image-input');

  // If user data exists, disable the form elements
  if (user) {
    fullNameInput.value = user.name;
    emailInput.value = user.email;
    passwordInput.value = user.password;

    imageInput.disabled = true;
    uploadBtn.disabled = true;
    fullNameInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    updateAccountBtn.disabled = true;

    // Remove hover effect for disabled buttons
    uploadBtn.classList.add('no-hover');
    updateAccountBtn.classList.add('no-hover');
  } else {
    // If user data does not exist (user is not logged in), disable the form elements
    fullNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    uploadBtn.disabled = true;
    fullNameInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    updateAccountBtn.disabled = true;

    // Remove hover effect for disabled buttons
    uploadBtn.classList.add('no-hover');
    updateAccountBtn.classList.add('no-hover');
  }
}

// Update User Accounts Profile
async function updateAccount() {
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const updatedUserData = {
    name: fullNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch('/api/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });

    const data = await response.json();
    console.log(data.message); // Success message from the server
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}



// fetch user datas from server
document.addEventListener('DOMContentLoaded', async function () {
  console.log('DOM content loaded!');
  // Get the profile input fields
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const profileSettings = document.getElementById('profileSettings');
  
  try {
    // Fetch user data from the backend API
    const response = await fetch('/api/profile');
    const data = await response.json();

    if (data.user) {
      // Populate the input fields with the user data
      fullNameInput.value = data.user.name;
      emailInput.value = data.user.email;
      passwordInput.value = data.user.password;

      // Fetch the profile image data from the server
      const response = await fetch(`/profile-image`);
      const responseData = await response.json();

      if (response.ok) {
        const imageUrl = await responseData.user;
        if (imageUrl) {
          return imageUrl;
        }
        // Display the profile settings with the image and dropdown menu
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${imageUrl}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;

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

        // Add event listener for the "Log Out" button
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', showLogoutModal);

        // Function to edit user datas in DOM
        const editAccountBtn = document.getElementById('editAccountbtn');
        editAccountBtn.addEventListener('click', () => {
          console.log('Edit Account button clicked!');
          
          // Enable the form elements when the button is clicked
          const fullNameInput = document.getElementById('full-name');
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const uploadBtn = document.getElementById('upload-btn');
          const updateAccountBtn = document.getElementById('updateAccountbtn');
          const imageInput = document.getElementById('image-input');

          imageInput.disabled = false;
          fullNameInput.disabled = false;
          emailInput.disabled = false;
          passwordInput.disabled = false;
          uploadBtn.disabled = false;
          updateAccountBtn.disabled = false;
          // editAccountBtn.disabled = true;

          // Remove hover effect for disabled buttons
          editAccountBtn.classList.add('no-hover');
          uploadBtn.classList.remove('no-hover');
          updateAccountBtn.classList.remove('no-hover');

          
        });
              
          // Attach click event listener to the "Update Account" button
          const updateAccountBtn = document.getElementById('updateAccountbtn');
          updateAccountBtn.addEventListener('click', () => {
            updateAccount(); // Call the updateAccount function when the button is clicked

            // Disable form elements except the "Edit Account" button
            const uploadBtn = document.getElementById('upload-btn');
            const fullNameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const editAccountBtn = document.getElementById('editAccountbtn');
            const imageInput = document.getElementById('image-input');

            fullNameInput.disabled = true;
            emailInput.disabled = true;
            passwordInput.disabled = true;
            uploadBtn.disabled = true;
            updateAccountBtn.disabled = true;
            // editAccountBtn.disabled = false;
            imageInput.disabled = true;

            // Remove hover effect for disabled buttons
            editAccountBtn.classList.remove('no-hover');
            uploadBtn.classList.add('no-hover');
            updateAccountBtn.classList.add('no-hover');
          });
      } else {
        // If there's no profile image, display the profile settings without the image
        // You can customize this as per your requirements.
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="https://i.imgur.com/r79g1jQ.jpg" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;
      }
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    // Handle the error or set a default image
    // // Get the image element
    const imgurImageUrl = 'https://i.imgur.com/r79g1jQ.jpg'; // Replace with the correct default image path
    const profileSettings = document.getElementById('profileSettings');
  
      // Display the profile settings with the fetched image data
      profileSettings.innerHTML = `
        <div id="profile-dropdown">
          <img src="${imgurImageUrl}" class="profile-img" id="profile-image" alt="User Profile" />
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

         // Function to edit user datas in DOM
         const editAccountBtn = document.getElementById('editAccountbtn');
         editAccountBtn.addEventListener('click', () => {
           console.log('Edit Account button clicked!');
           
           // Enable the form elements when the button is clicked
           const fullNameInput = document.getElementById('full-name');
           const emailInput = document.getElementById('email');
           const passwordInput = document.getElementById('password');
           const uploadBtn = document.getElementById('upload-btn');
           const updateAccountBtn = document.getElementById('updateAccountbtn');
           const imageInput = document.getElementById('image-input');
 
           imageInput.disabled = false;
           fullNameInput.disabled = false;
           emailInput.disabled = false;
           passwordInput.disabled = false;
           uploadBtn.disabled = false;
           updateAccountBtn.disabled = false;
           // editAccountBtn.disabled = true;
 
           // Remove hover effect for disabled buttons
           editAccountBtn.classList.add('no-hover');
           uploadBtn.classList.remove('no-hover');
           updateAccountBtn.classList.remove('no-hover');
 
           
         });
               
           // Attach click event listener to the "Update Account" button
           const updateAccountBtn = document.getElementById('updateAccountbtn');
           updateAccountBtn.addEventListener('click', () => {
             updateAccount(); // Call the updateAccount function when the button is clicked
 
             // Disable form elements except the "Edit Account" button
             const uploadBtn = document.getElementById('upload-btn');
             const fullNameInput = document.getElementById('full-name');
             const emailInput = document.getElementById('email');
             const passwordInput = document.getElementById('password');
             const editAccountBtn = document.getElementById('editAccountbtn');
             const imageInput = document.getElementById('image-input');
 
             fullNameInput.disabled = true;
             emailInput.disabled = true;
             passwordInput.disabled = true;
             uploadBtn.disabled = true;
             updateAccountBtn.disabled = true;
             // editAccountBtn.disabled = false;
             imageInput.disabled = true;
 
             // Remove hover effect for disabled buttons
             editAccountBtn.classList.remove('no-hover');
             uploadBtn.classList.add('no-hover');
             updateAccountBtn.classList.add('no-hover');
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
});

// File Upload
document.addEventListener('DOMContentLoaded', function () {
  const profileImage = document.getElementById('profile-image');
  const uploadBtn = document.getElementById('upload-btn');

  // Add event listener to the "Upload Image" button
  uploadBtn.addEventListener('click', function () {
      // Create a hidden file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      // Add event listener to the hidden file input
      fileInput.addEventListener('change', function () {
          const file = fileInput.files[0];
          if (file) {
              // Read the uploaded image and set it as the profile image
              const reader = new FileReader();
              reader.onload = function (event) {
                  profileImage.src = event.target.result;
              };
              reader.readAsDataURL(file);

              // Send the image to the backend when the file is selected
            sendImageToBackend(file);
          }
      });

      // Trigger the hidden file input to open the file dialog
      fileInput.click();
  });
    // Function to send the image to the backend
    async function sendImageToBackend(file) {
      const SignupformDatas = new FormData();
      SignupformDatas.append('profile-image', file);

      try {
        const response = await fetch('/api/profile/upload', {
          method: 'POST',
          body: SignupformDatas,
        });

       
        const data = await response.json();
        console.log(data.message); // Success message from the server


            
        // // Store the image data in local storage
        // localStorage.setItem('profileImage', profileImage.src);
 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  });

  
  
  

  