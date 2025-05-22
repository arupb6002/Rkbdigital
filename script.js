document.addEventListener('DOMContentLoaded', function() {
  let lastScroll = 0;
  const menu = document.querySelector('.menu-container');
  const burger = document.getElementById('burger');
  const threshold = 100;
  const scrollDownThreshold = 50;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Scrolling down behavior
    if (currentScroll > lastScroll && currentScroll > scrollDownThreshold) {
      // Hide menu completely when scrolling down
      menu.classList.add('hide-menu');
      
      // Also make sure to close the menu if open
      if (burger.checked) {
        burger.checked = false;
      }
    } 
    // Scrolling up behavior
    else if (currentScroll < lastScroll) {
      menu.classList.remove('hide-menu');
      
      // Add scrolled class when past threshold
      if (currentScroll > threshold) {
        menu.classList.add('scrolled');
      } else {
        menu.classList.remove('scrolled');
      }
    }
    
    lastScroll = currentScroll;
  });

  // Close menu on outside click
  document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.menu-container');
    if (!menuContainer.contains(event.target)) {
      burger.checked = false;
    }
  });

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll('.menu-content a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.checked = false;
    });
  });
});