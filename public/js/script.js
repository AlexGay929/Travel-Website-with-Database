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


/* ==========scroll reveal========= */
ScrollReveal({ 
   // reset: true,
   distance: '80px',
   duration: 2000,
   delay: 200
});

ScrollReveal().reveal('.swiper, .heading-title', { origin: 'top' });
ScrollReveal().reveal('.reviews, .home-offer, .home-packages, .home-about, .box-container, .booking', { origin: 'bottom' });
ScrollReveal().reveal('.about, .partner, .services, .heading', { origin: 'left' });
ScrollReveal().reveal('.tables, .about-content', { origin: 'right' });


document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("bookingForm");
   form.addEventListener("submit", handleSubmit);
 });
 
 function handleSubmit(event) {
   event.preventDefault();
 
   const name = document.getElementById("name").value;
   const email = document.getElementById("email").value;
   const phone = document.getElementById("phone").value;
   const address = document.getElementById("address").value;
   const placeToVisit = document.getElementById("placeToVisit").value;
   const numberOfGuests = document.getElementById("numberOfGuests").value;
   const arrivalDate = document.getElementById("arrivalDate").value;
   const departureDate = document.getElementById("departureDate").value;
 
   // Save the form data to local storage
   saveFormDataToLocalStorage(name, email, phone, address, placeToVisit, numberOfGuests, arrivalDate, departureDate);
 
   // Show success alert
   showSuccessAlert();
   console.log(name)
 }
 
 function saveFormDataToLocalStorage(name, email, phone, address, placeToVisit, numberOfGuests, arrivalDate, departureDate) {
   // You can store the data as an object or any other desired format
   const formData = { name, email, phone, address, placeToVisit, numberOfGuests, arrivalDate, departureDate };
   localStorage.setItem("formData", JSON.stringify(formData));
 }
 
 function showSuccessAlert() {
   alert("Form data submitted successfully!");
 }
 