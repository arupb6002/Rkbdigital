document.addEventListener('DOMContentLoaded', function() {
  // Your existing menu scroll behavior
  let lastScroll = 0;
  const menu = document.querySelector('.menu-container');
  const burger = document.getElementById('burger');
  const threshold = 100;
  const scrollDownThreshold = 50;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Scrolling down behavior
    if (currentScroll > lastScroll && currentScroll > scrollDownThreshold) {
      menu.classList.add('hide-menu');
      if (burger.checked) {
        burger.checked = false;
      }
    } 
    // Scrolling up behavior
    else if (currentScroll < lastScroll) {
      menu.classList.remove('hide-menu');
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

  // Professional Popup Implementation
  const popup = document.getElementById('facebook-popup');
  const closeBtn = document.querySelector('.close-btn');
  
  if (popup) {
    // Show popup after delay if not dismissed before
    if (!localStorage.getItem('popupDismissed')) {
      setTimeout(() => {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger animations
        setTimeout(() => {
          popup.classList.add('active');
          document.querySelector('.popup-content').classList.add('animate-in');
        }, 10);
      }, 2000);
    }

    // Close functionality
    const closePopup = () => {
      document.querySelector('.popup-content').classList.remove('animate-in');
      document.querySelector('.popup-content').classList.add('animate-out');
      
      setTimeout(() => {
        popup.classList.remove('active');
        popup.style.display = 'none';
        document.body.style.overflow = '';
        localStorage.setItem('popupDismissed', 'true');
        
        // Reset after 24 hours
        setTimeout(() => {
          localStorage.removeItem('popupDismissed');
        }, 86400000);
      }, 300);
    };

    // Close button event
    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }

    // Close when clicking outside
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        closePopup();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
      }
    });
  }
});