function testFunction() {
  console.log("ok ka paare ko!")
}

testFunction();

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


// client.js
async function checkLoginStatus() {
 try {
   const response = await fetch('/api/login-status');
   const data = await response.json();

   // data.isLoggedIn will be true if the user is logged in
   // Update the UI based on the login status
   if (data.isLoggedIn) {
     // Show a logged-in user interface
     showLoggedInUI();
   } else {
     // Show a non-logged-in user interface
     showNonLoggedInUI();
   }
 } catch (error) {
   console.error('Error fetching login status:', error);
 }
}

function showLoggedInUI() {
 // Update the UI to show elements for logged-in users
 // Remove the "Register" and "Log In" buttons
 const signupButton = document.getElementById('signupButton');
 const loginButton = document.getElementById('loginButton');
 signupButton.style.display = 'none';
 loginButton.style.display = 'none';
 document.getElementById('loginForm').style.display = 'none';

 // Display the profile settings with an image
 const profileSettings = document.getElementById('profileSettings');
 profileSettings.innerHTML = `
         <div id="profile-dropdown">
             <img src="https://i.imgur.com/r79g1jQ.jpg" class="profile-img" alt="User Profile" />
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


}


function showNonLoggedInUI() {
 // Update the UI to show elements for non-logged-in users
  // Remove the "Register" and "Log In" buttons
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const profileSettings = document.getElementById('profileSettings');
 //  const profileInfo = document.getElementById('profile-info');
 //  profileInfo.classList.remove('show');
  profileSettings.style.display = 'none';
  signupButton.style.display = 'block';
  loginButton.style.display = 'block';
 document.getElementById('loginForm').style.display = 'block';

}

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

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
    editAccountBtn.disabled = false;
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
    editAccountBtn.disabled = true;
    updateAccountBtn.disabled = true;

    // Remove hover effect for disabled buttons
    uploadBtn.classList.add('no-hover');
    updateAccountBtn.classList.add('no-hover');
  }
}


// fetch user datas from server
document.addEventListener('DOMContentLoaded', async function () {
  // Get the profile input fields
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const profileSettings = document.getElementById('profileSettings');
  const profileImage = document.getElementById('profile-img');

  
  // Retrieve the image data from local storage
  const storedProfileImage = localStorage.getItem('profileImage');
  if (storedProfileImage) {
    profileImage.src = storedProfileImage;
    console.log(profileImage)
  }

  try {
    // Fetch user data from the backend API
    const response = await fetch('/api/profile');
    const data = await response.json();

    if (data.user) {
      // Populate the input fields with the user data
      fullNameInput.value = data.user.name;
      emailInput.value = data.user.email;
      passwordInput.value = data.user.password;


      // Display the profile settings with the image and dropdown menu
      profileSettings.innerHTML = `
        <div id="profile-dropdown">
          <img src="${storedProfileImage}" class="profile-img" id="profile-image" alt="User Profile" />
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

      // Call the function with the user data to enable/disable form elements
      setFormElementsStatus(data.user); // <-- Call here

      // Attach click event listener to the "Edit Account" button
      // Function to edit user datas in DOM
      const editAccountBtn = document.getElementById('editAccountbtn');
    
      editAccountBtn.addEventListener('click', () => {
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

     

    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
});


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

document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const profileImage = document.getElementById('profile-img');
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
      SignupformDatas.append('profileImage', file);

      try {
        const response = await fetch('/api/profile/upload', {
          method: 'POST',
          body: SignupformDatas,
        });

       
        const data = await response.json();
        console.log(data.message); // Success message from the server


            
        // Store the image data in local storage
        localStorage.setItem('profileImage', profileImage.src);
 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', async function () {
    try {
      // Make a POST request to the /login endpoint to fetch user data
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Your login credentials data here, if required
          // loginEmail: 'user@example.com',
          // loginPassword: 'password'
  
        })
      });
  
      const data = await response.json();
      console.log(data)
  
      if (data.user) {
        // Populate the email and name fields with the user data
        const fullNameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        // Populate the user data in the HTML
        fullNameInput.textContent = data.user.name || '';
        emailInput.textContent = data.user.email || '';
  
        // fullNameInput.value = data.user.name || '';
        // emailInput.value = data.user.email || '';
      } else {
        console.error('User data not found in the response');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
  
 