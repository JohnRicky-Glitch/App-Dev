document.getElementById("loginBtn").addEventListener("click", function () {
  var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});

document.getElementById("showRegisterForm").addEventListener("click", function (e) {
  e.preventDefault();
  var loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  loginModal.hide();
  
  var registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
  registerModal.show();
});

var map = L.map('map').setView([14.6197, 121.0657], 16); // Coordinates for Barangay San Roque, Quezon City
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);
L.marker([14.6197, 121.0657]).addTo(map)
  .bindPopup('Barangay San Roque<br>19th Ave, Quezon City, Philippines, 1109')
  .openPopup();


  // MAKE HEADER DISSPPEAR

  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down, hide the navbar
      navbar.style.top = '-100px';
    } else {
      // Scrolling up, show the navbar
      navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
  });


  // Toggle button for barangay Officials
  const toggleBtn = document.getElementById('toggleOfficialsBtn');
  const officialCards = document.querySelectorAll('.official-card');
  let officialsVisible = false;

  toggleBtn.addEventListener('click', function() {
    officialsVisible = !officialsVisible;

    officialCards.forEach(card => {
      card.style.display = officialsVisible ? 'block' : 'none';
    });

    // Change button text based on visibility state
    toggleBtn.textContent = officialsVisible ? 'Hide Officials' : 'Show Officials';
  });