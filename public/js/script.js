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


var swiper = new Swiper(".home-slider", {
      loop:true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
   });
   
var swiper = new Swiper(".reviews-slider", {
      grabCursor:true,
      loop:true,
      autoHeight:true,
      spaceBetween: 20,
      breakpoints: {
         0: {
           slidesPerView: 1,
         },
         700: {
           slidesPerView: 2,
         },
         1000: {
           slidesPerView: 3,
         },
      },
   });

// Typed.js initialization in all slides
var typedElements = document.querySelectorAll(".multiple-text");
for (var i = 0; i < typedElements.length; i++) {
  var typed = new Typed(typedElements[i], {
    strings: ['TOUR AROUND THE PHILIPPINES', 'EMBRACE THE NEW DESTINATION', 'DISCOVER THE UNEXPLORED'],
   //  strings: ["TOUR AROUND THE PHILIPPINES" + (i + 1) + "EMBRACE THE NEW DESTINATION", "DISCOVER THE UNEXPLORED"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    showCursor: false, // Set to false to remove the cursor
  });
}



/* ==========scroll reveal========= */
ScrollReveal({ 
   // reset: true,
   distance: '80px',
   duration: 2000,
   delay: 200
});

ScrollReveal().reveal('.swiper, .heading-title', { origin: 'top' });
ScrollReveal().reveal('.about, .reviews, .home-offer, .home-packages, .home-about, .box-container, .booking', { origin: 'bottom' });
ScrollReveal().reveal('.partner, .services, .heading', { origin: 'left' });
ScrollReveal().reveal('.tables, .about-content', { origin: 'right' });


// Open the sign-up modal when the sign-up button is clicked
document.getElementById("signup-button").addEventListener("click", function() {
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
document.getElementById('login-button').addEventListener('click', openModal);
document.getElementById('loginclose-button').addEventListener('click', closeModal);


// // Sign Up form Datas saved successfully to database alert message
// document.getElementById('showAlertButton').addEventListener('click', () => {
//   // Make an HTTP request to the backend
//   fetch('/sign_up')
//     .then((response) => response.json())
//     .then((data) => {
//       // Show the res.json message as an alert
//       alert(data.message);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
// });



 

 